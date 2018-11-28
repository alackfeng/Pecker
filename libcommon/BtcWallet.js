var bip39 = require('bip39');
var bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib')
const assert = require('assert')

import { encrypt, decrypt, shallowCopy, isSecretStorageWallet } from './secretWallet';


export default class BtcWallet {

  constructor({mnemonic, seed, node, index}) {

    this.type = 'BTC';
    this.path = "m/44'/0'/0'/0/0";

    this.seed = seed;
    this.mnemonic = mnemonic;
    this.node = node;
    this.index = index;  

    // console.log('===== BtcWallet::constructor ', this);
  
  }

  getAddress () {

    const keyPair = bitcoin.ECPair.fromWIF(this.node.toWIF())
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    return address;
  }

  getKeyPair () {
    
    const keyPair = bitcoin.ECPair.fromWIF(this.node.toWIF())
    // console.log('===== BtcWallet::fromMnemonic - bitcoin keyPair ', this.node.toWIF(), keyPair.toWIF());
    return keyPair;
  }

  deriveChild (index) {

    const node = bip32.fromSeed(this.seed)

    // "m/44'/0'/0'/0/0"
    const child = node.deriveHardened(44)
      .deriveHardened(0)
      .deriveHardened(0)
      .derive(0)
      .derive(index || 0)

    const childWallet = new BtcWallet({ seed: this.seed, node: child, index: index });

    return childWallet;
  }

  derivePath (path) {

    const child = this.node.derivePath(path || this.path)
    return new BtcWallet({ mnemonic: this.mnemonic, seed: this.seed, node: child, index: 0 })
  }

  static fromWIF( {priv} ) {
    
  }

  static fromMnemonic({mnemonic}) {


    if(mnemonic) {

      const seed = bip39.mnemonicToSeed(mnemonic)
      const node = bip32.fromSeed(seed)

      return new BtcWallet({ mnemonic, seed, node, index: -1}).derivePath();
    }

    // if(entropy) {
    //   let rng = function() { 
    //     return Buffer.from(entropy) 
    //   }

    //   const keyPair = bitcoin.ECPair.makeRandom({ rng: rng })
    //   const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })

    //   console.log('===== BtcWallet::fromMnemonic - bitcoin keyPair ', keyPair.toWIF(), keyPair, address);

    //   return {keyPair, address};
    // }
  }

  encrypt(password, options, progressCallback) {
    // console.log('+++++BtcWallet::encrypt - type: ', this.type || 'ETH');

    if (typeof(options) === 'function' && !progressCallback) {
      progressCallback = options;
      options = {};
    }

    if (progressCallback && typeof(progressCallback) !== 'function') {
        throw new Error('invalid callback');
    }

    if (!options) { options = {}; }

    let _This = this;
    if (_This.seed) {
        // Make sure we don't accidentally bubble the mnemonic up the call-stack
        options = shallowCopy(options);

        // Set the mnemonic and path
        options.mnemonic = _This.mnemonic;
        options.path = _This.path;
        options.type =  _This.type ; // BTC
        options.seed = _This.seed;
        options.index = _This.index;
    }

    return encrypt(_This.getKeyPair().toWIF(), password, options, progressCallback);
  }

  static fromEncryptedJson(json, password, progressCallback) {
    
    if (isSecretStorageWallet(json)) {

        return decrypt(json, password, progressCallback).then(function(signingKey) {
            // console.log('++++++BtcWallet::fromEncryptedJson - signingKey: ', signingKey);
            return BtcWallet.fromMnemonic(signingKey);
            // return new ethers.Wallet(signingKey);
        });
    }

    return Promise.reject('invalid wallet JSON');
  }

}