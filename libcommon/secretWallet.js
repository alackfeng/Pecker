/*
 * etherjs copy
 **/

import EosWallet from './EosWallet';
import BtcWallet from './BtcWallet';
import * as HDNode from 'ethers/utils/hdnode';
import { SigningKey } from 'ethers/utils/signing-key';
import { arrayify, concat, hexlify } from 'ethers/utils/bytes';
import { toUtf8Bytes, UnicodeNormalizationForm } from 'ethers/utils/utf8';
import { keccak256 } from 'ethers/utils/keccak256';

import { randomBytes as _randomBytes } from 'crypto';
import aes from 'aes-js';
import scrypt from 'scrypt-js';
import uuid from 'uuid';

const secp256k1 = require('secp256k1');
import ecc from 'eosjs-ecc'
import wif from 'wif'


const bitcoin = require('bitcoinjs-lib')



export function shallowCopy(object) {
    let result = {};
    for (var key in object) { result[key] = object[key]; }
    return result;
}

export function isSecretStorageWallet(json) {
    try {
        var data = JSON.parse(json);
    }
    catch (error) {
        return false;
    }
    if (!data.version || parseInt(data.version) !== data.version || parseInt(data.version) !== 3) {
        return false;
    }
    // @TODO: Put more checks to make sure it has kdf, iv and all that good stuff
    return true;
}


function looseArrayify(hexString: string): Uint8Array {
    if (typeof(hexString) === 'string' && hexString.substring(0, 2) !== '0x') {
        hexString = '0x' + hexString;
    }
    return arrayify(hexString);
}

function zpad(value: String | number, length: number): String {
    value = String(value);
    while (value.length < length) { value = '0' + value; }
    return value;
}

function getPassword(password: Arrayish): Uint8Array {
    if (typeof(password) === 'string') {
        return toUtf8Bytes(password, UnicodeNormalizationForm.NFKC);
    }
    return arrayify(password);
}

// Search an Object and its children recursively, caselessly.
function searchPath(object: any, path: string): string {
    var currentChild = object;

    var comps = path.toLowerCase().split('/');
    for (var i = 0; i < comps.length; i++) {

        // Search for a child object with a case-insensitive matching key
        var matchingChild = null;
        for (var key in currentChild) {
             if (key.toLowerCase() === comps[i]) {
                 matchingChild = currentChild[key];
                 break;
             }
        }

        // Didn't find one. :'(
        if (matchingChild === null) {
            return null;
        }

        // Now check this child...
        currentChild = matchingChild;
    }

    return currentChild;
}

function randomBytes(length) {
    return (_randomBytes(length));
}

function getAddress(address) {
  return address;
}

function checkAddress(type, privateKey, address) {

  var publicKey = getPublicKey(type, privateKey); // new SigningKey(privateKey);
  publicKey = publicKey.substring(0).toLowerCase();
  var address = getAddress(address);
  // console.log('+++++secretWallet::checkAddress - ', publicKey, address);
  return !!(publicKey === address);
}

function checkPriv(type, node, privateKey) {

  let nodePrivateKey = null;

  if(type === 'BTC') {
    nodePrivateKey = node.getKeyPair().toWIF();
  }
  else if(type === 'EOS') {
    nodePrivateKey = node.getPrivateKey();
  }
  else {
    nodePrivateKey = node.privateKey;
  }
  // console.log('+++++secretWallet::checkPriv - ', nodePrivateKey, privateKey);
  return !!(nodePrivateKey === privateKey)
}

// function hexlify(value) {
//   return value;
// }


function getPublicKey(type, privateKey) {

  var address = null;
  if(type === 'BTC') {
    const keyPair = bitcoin.ECPair.fromWIF(privateKey)
    const { address: BtcAddress } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    address = BtcAddress;
  }
  else if(type === 'EOS') {
    const eosprivateKey = wif.decode(privateKey).privateKey
    const publicKey = secp256k1.publicKeyCreate(eosprivateKey, true);
    address = ecc.PublicKey(publicKey).toString()

  } 
  else {
    // let privateKeyBytes = aes.utils.utf8.toBytes(privateKey);
    address = (new SigningKey(privateKey)).address;
  }

  return address;
}

function getHDNode(type, mnemonic, path) {

  if(type === 'BTC') {
    return BtcWallet.fromMnemonic({mnemonic});
  }
  else if(type === 'EOS') {
    return EosWallet.fromMnemonic({mnemonic});
  }
  else {
    return HDNode.fromMnemonic(mnemonic).derivePath(path);
  }

}

function getPriv(type, privateKey) {

  if(type === 'BTC') {
    return BtcWallet.fromWIF({privateKey});
  } 
  else if(type === 'EOS') {
    return EosWallet.fromPrivateKey(privateKey);
  }
  else {
    return new SigningKey(privateKey);
  }
}



export function encrypt(privateKey, password, options, progressCallback) {
    // console.log('+++++secretWallet::encrypt - params: ', privateKey, password, options, progressCallback)

    // the options are optional, so adjust the call as needed
    if (typeof(options) === 'function' && !progressCallback) {
        progressCallback = options;
        options = {};
    }
    if (!options) { options = {}; }

    // Check the private key
    let privateKeyBytes: Uint8Array = null;
    // if (SigningKey.isSigningKey(privateKey)) {
    //     privateKeyBytes = arrayify(privateKey.privateKey);
    // } else {
        privateKeyBytes = aes.utils.utf8.toBytes(privateKey);
    // }
    // privateKeyBytes = privateKey;
    // if (privateKeyBytes.length !== 32) { throw new Error('invalid private key'); }

    let passwordBytes = getPassword(password);


    let entropy: Uint8Array = null

    if (options.entropy) {
        entropy = (options.entropy);
    }

    // console.log('+++++secretWallet::encrypt - mnemonic: ', options.mnemonic)
    if (options.mnemonic) {
        if (entropy) {
            if (HDNode.entropyToMnemonic(entropy) !== options.mnemonic) {
                throw new Error('entropy and mnemonic mismatch');
            }
        } else {
            entropy = arrayify(HDNode.mnemonicToEntropy(options.mnemonic));
        }
    }

    var path: string = options.path;
    if (entropy && !path) {
        path = HDNode.defaultPath;
    }

    var client = options.client;
    if (!client) { client = "hdwallet.js"; }

    // Check/generate the salt
    let salt: Uint8Array = null;
    if (options.salt) {
        salt = (options.salt);
    } else {
        salt = randomBytes(32);;
    }

    // Override initialization vector
    let iv: Uint8Array = null;
    if (options.iv) {
        iv = (options.iv);
        if (iv.length !== 16) { throw new Error('invalid iv'); }
    } else {
       iv = randomBytes(16);
    }

    // Override the uuid
    var uuidRandom: Uint8Array = null;
    if (options.uuid) {
        uuidRandom = (options.uuid);
        if (uuidRandom.length !== 16) { throw new Error('invalid uuid'); }
    } else {
        uuidRandom = randomBytes(16);
    }

    // Override the scrypt password-based key derivation function parameters
    var N = (1 << 17), r = 8, p = 1;
    if (options.scrypt) {
        if (options.scrypt.N) { N = options.scrypt.N; }
        if (options.scrypt.r) { r = options.scrypt.r; }
        if (options.scrypt.p) { p = options.scrypt.p; }
    }

    return new Promise(function(resolve, reject) {
        if (progressCallback) { progressCallback(0); }

        // We take 64 bytes:
        //   - 32 bytes   As normal for the Web3 secret storage (derivedKey, macPrefix)
        //   - 32 bytes   AES key to encrypt mnemonic with (required here to be Ethers Wallet)
        scrypt(passwordBytes, salt, N, r, p, 64, function(error, progress, key) {
            if (error) {
                error.progress = progress;
                reject(error);

            } else if (key) {
                // console.log('+++++secretWallet::encrypt - scrypt key befer: ', key)
                key = arrayify(key);
                // console.log('+++++secretWallet::encrypt - scrypt key after: ', key)

                // This will be used to encrypt the wallet (as per Web3 secret storage)
                var derivedKey = key.slice(0, 16);
                var macPrefix = key.slice(16, 32);

                // This will be used to encrypt the mnemonic phrase (if any)
                var mnemonicKey = key.slice(32, 64);

                // Get the address for this private key
                var address = getPublicKey(options.type, privateKey); // || (new SigningKey(privateKeyBytes)).address;
                // console.log('+++++secretWallet::encrypt - privateKey: ', privateKey);

                // Encrypt the private key
                var counter = new aes.Counter(iv);
                var aesCtr = new aes.ModeOfOperation.ctr(derivedKey, counter);
                var ciphertext = (aesCtr.encrypt(privateKeyBytes));
                

                // Compute the message authentication code, used to check the password
                var mac = keccak256(concat([macPrefix, ciphertext]))
                // console.log('++++++secretWallet::encrypt - mac: ', mac, macPrefix, ciphertext);

                // See: https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
                var data: { [key: string]: any } = {
                    address: address.substring(0).toLowerCase(),
                    id: uuid.v4({ random: uuidRandom }),
                    version: 3,
                    Crypto: {
                        cipher: 'aes-128-ctr',
                        cipherparams: {
                            iv: hexlify(iv).substring(2),
                        },
                        ciphertext: hexlify(ciphertext).substring(2),
                        kdf: 'scrypt',
                        kdfparams: {
                            salt: hexlify(salt).substring(2),
                            n: N,
                            dklen: 32,
                            p: p,
                            r: r
                        },
                        mac: mac.substring(2)
                    },
                    type: options.type || 'ETH',
                    path: options.path,
                    index: options.index,
                };

                // If we have a mnemonic, encrypt it into the JSON wallet
                if (entropy) {
                    var mnemonicIv = randomBytes(16);
                    var mnemonicCounter = new aes.Counter(mnemonicIv);
                    var mnemonicAesCtr = new aes.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);
                    var mnemonicCiphertext = arrayify(mnemonicAesCtr.encrypt(entropy));
                    var now = new Date();
                    var timestamp = (now.getUTCFullYear() + '-' +
                                     zpad(now.getUTCMonth() + 1, 2) + '-' +
                                     zpad(now.getUTCDate(), 2) + 'T' +
                                     zpad(now.getUTCHours(), 2) + '-' +
                                     zpad(now.getUTCMinutes(), 2) + '-' +
                                     zpad(now.getUTCSeconds(), 2) + '.0Z'
                                    );
                    data['x-ethers'] = {
                        client: client,
                        gethFilename: ('UTC--' + timestamp + '--' + data.address),
                        mnemonicCounter: hexlify(mnemonicIv).substring(2),
                        mnemonicCiphertext: hexlify(mnemonicCiphertext).substring(2),
                        version: "0.1"
                    };
                }

                if (progressCallback) { progressCallback(1); }
                resolve(JSON.stringify(data));

            } else if (progressCallback) {
                return progressCallback(progress);
            }
        });
    });
}

export function decrypt(json, password, progressCallback) {
    var data = JSON.parse(json);
    
    let type ='ETH';
    try { type = JSON.parse(json).type } catch( e ) { type = 'ETH' };


    let passwordBytes = getPassword(password);
    // console.log('+++++secretWallet::decrypt - ', password, data);

    var decrypt = function(key: Uint8Array, ciphertext: Uint8Array): Uint8Array {
        var cipher = searchPath(data, 'crypto/cipher');
        if (cipher === 'aes-128-ctr') {
            var iv = looseArrayify(searchPath(data, 'crypto/cipherparams/iv'))
            var counter = new aes.Counter(iv);

            var aesCtr = new aes.ModeOfOperation.ctr(key, counter);

            return aes.utils.utf8.fromBytes(aesCtr.decrypt(ciphertext));
        }

        return null;
    };

    var computeMAC = function(derivedHalf: Uint8Array, ciphertext: Uint8Array) {
        return keccak256(concat([derivedHalf, ciphertext]));
    }

    var getSigningKey = function(key: Uint8Array, reject: (error?: Error) => void) {
        var ciphertext = looseArrayify(searchPath(data, 'crypto/ciphertext'));


        var computedMAC = hexlify(computeMAC(key.slice(16, 32), ciphertext)).substring(2);
        if (computedMAC !== searchPath(data, 'crypto/mac').toLowerCase()) {
            reject(new Error('invalid password'));
            return null;
        }


        var privateKey = decrypt(key.slice(0, 16), ciphertext);
        var mnemonicKey = key.slice(32, 64);

        if (!privateKey) {
            reject(new Error('unsupported cipher'));
            return null;
        }

        // console.log('+++++secretWallet::decrypt - privateKey: ', privateKey, mnemonicKey);
        var signingKey = getPriv(type, privateKey);
        
        if (!checkAddress(type, privateKey, data.address)) {
            reject(new Error('address mismatch'));
            return null;
        }

        // Version 0.1 x-ethers metadata must contain an encrypted mnemonic phrase
        if (searchPath(data, 'x-ethers/version') === '0.1') {
            var mnemonicCiphertext = looseArrayify(searchPath(data, 'x-ethers/mnemonicCiphertext'));
            var mnemonicIv = looseArrayify(searchPath(data, 'x-ethers/mnemonicCounter'));

            var mnemonicCounter = new aes.Counter(mnemonicIv);
            var mnemonicAesCtr = new aes.ModeOfOperation.ctr(mnemonicKey, mnemonicCounter);

            var path = searchPath(data, 'x-ethers/path') || HDNode.defaultPath;

            var entropy = arrayify(mnemonicAesCtr.decrypt(mnemonicCiphertext));
            var mnemonic = HDNode.entropyToMnemonic(entropy);
            

            var node = getHDNode(type, mnemonic, path); // HDNode.fromMnemonic(mnemonic).derivePath(path);

            if (!checkPriv(type, node, privateKey)) {
                reject(new Error('mnemonic mismatch'));
                return null;
            }

            signingKey = node; // new SigningKey(node);
        }

        return signingKey;
    }


    return new Promise(function(resolve, reject) {
        var kdf = searchPath(data, 'crypto/kdf');
        if (kdf && typeof(kdf) === 'string') {
            if (kdf.toLowerCase() === 'scrypt') {
                var salt = looseArrayify(searchPath(data, 'crypto/kdfparams/salt'));
                var N = parseInt(searchPath(data, 'crypto/kdfparams/n'));
                var r = parseInt(searchPath(data, 'crypto/kdfparams/r'));
                var p = parseInt(searchPath(data, 'crypto/kdfparams/p'));
                if (!N || !r || !p) {
                    reject(new Error('unsupported key-derivation function parameters'));
                    return;
                }

                // Make sure N is a power of 2
                if ((N & (N - 1)) !== 0) {
                    reject(new Error('unsupported key-derivation function parameter value for N'));
                    return;
                }

                var dkLen = parseInt(searchPath(data, 'crypto/kdfparams/dklen'));
                if (dkLen !== 32) {
                    reject( new Error('unsupported key-derivation derived-key length'));
                    return;
                }

                if (progressCallback) { progressCallback(0); }
                scrypt(passwordBytes, salt, N, r, p, 64, function(error, progress, key) {
                    if (error) {
                        error.progress = progress;
                        reject(error);

                    } else if (key) {
                        key = arrayify(key);

                        var signingKey = getSigningKey(key, reject);
                        if (!signingKey) { return; }

                        if (progressCallback) { progressCallback(1); }
                        resolve(signingKey);

                    } else if (progressCallback) {
                        return progressCallback(progress);
                    }
                });

            } else {
                reject(new Error('unsupported key-derivation function'));
            }

        } else {
            reject(new Error('unsupported key-derivation function'));
        }
    });



}




