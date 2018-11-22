var bip39 = require('bip39');
var bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib')
const assert = require('assert')



export default class BtcWallet {

  constructor({seed, node, index}) {

    this.type = 'BTC';
    this.path = "m/44'/0'/0'/0/0";

    this.seed = seed;
    this.node = node;
    this.index = index;    
  }

  getAddress () {

    const keyPair = bitcoin.ECPair.fromWIF(this.node.toWIF())
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    return address;
  }

  getKeyPair () {
    
    const keyPair = bitcoin.ECPair.fromWIF(this.node.toWIF())
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })

    console.log('===== BtcWallet::fromMnemonic - bitcoin keyPair ', this.node.toWIF(), keyPair.toWIF(), address);

    return {keyPair, address}
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
    
    // if(inner === 1) { 
    //   this.childWallets[index] = childWallet;
    // }

    return childWallet;
  }

  derivePath (path) {

    const child = this.node.derivePath(path || this.path)
    return new BtcWallet({ seed: this.seed, node: child, index: 0 })
  }

  static fromMnemonic({mnemonic}) {


    if(mnemonic) {

      const seed = bip39.mnemonicToSeed(mnemonic)
      const node = bip32.fromSeed(seed)

      return new BtcWallet({ seed, node, index: -1}).derivePath();
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

}