var bip39 = require('bip39');
var bip32 = require('bip32');
const assert = require('assert')
const secp256k1 = require('secp256k1');
import ecc from 'eosjs-ecc'
import wif from 'wif'


export default class EosWallet {

  constructor({seed, node, index}) {

    this.type = 'EOS';
    this.path = "m/44'/194'/0'/0/0";

    this.seed = seed;
    this.node = node;
    this.index = index;    
  }

  getPublicKey () {
    return ecc.PublicKey(this.node.publicKey).toString()
  }

  getPrivateKey () {
    return wif.encode(128, this.node.privateKey, false)
  }

  deriveChild (index) {

    const node = bip32.fromSeed(this.seed)

    // "m/44'/0'/0'/0/0"
    const child = node.deriveHardened(44)
      .deriveHardened(0)
      .deriveHardened(0)
      .derive(0)
      .derive(index || 0)

    const childWallet = new EosWallet({ seed: this.seed, node: child, index: index });
    
    // if(inner === 1) { 
    //   this.childWallets[index] = childWallet;
    // }

    return childWallet;
  }

  derivePath (path) {

    const child = this.node.derivePath(path || this.path)
    return new EosWallet({ seed: this.seed, node: child, index: 0 })
  }

  static fromMnemonic({mnemonic}) {

    if(mnemonic) {

      const seed = bip39.mnemonicToSeed(mnemonic)
      const node = bip32.fromSeed(seed)

      return new EosWallet({ seed, node, index: -1}).derivePath();
    }

  }

  static fromPrivateKey (key, chainId) {
    const privateKey = wif.decode(key).privateKey
    const publicKey = secp256k1.publicKeyCreate(privateKey, true);

    let node = bip32.fromPrivateKey(privateKey, privateKey);

    // console.log('=====EosWallet::fromPrivateKey - EOS8eWEFoDmTCg7NoerFs5hW8TjhbXnsNZCZhWsJ3QYPHUVnwFM5E ', privateKey, key, node, wallet.getPrivateKey(), wallet.getPublicKey());
    return new EosWallet({ seed: null, node, index: -1});
  }

}