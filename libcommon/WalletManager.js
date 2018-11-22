
import EosWallet from './EosWallet';

import * as ecc from "eosjs-ecc-rn";
import { ethers } from 'ethers';
import { defaultPath, HDNode, entropyToMnemonic, fromMnemonic } from 'ethers/utils/hdnode';
var bip39 = require('bip39');
var bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib')
const assert = require('assert')


const walletType = ['EOS', 'ETH', 'BTC'];


let walletsObjects = {};
let mnemonicDefault = "radar blur cabbage chef fix engine embark joy scheme fiction master release";



class BtcWallet {

  constructor({seed, node, index}) {

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

    return new BtcWallet({ seed: this.seed, node: child, index: index })
  }

  derivePath (path) {

    const child = this.node.derivePath(path || "m/44'/0'/0'/0/0")
    return new BtcWallet({ seed: this.seed, node: child, index: 0 })
  }

  static fromMnemonic({entropy, mnemonic}) {


    if(mnemonic) {

      const seed = bip39.mnemonicToSeed(mnemonic)
      const node = bip32.fromSeed(seed)

      // const child1b = root.derivePath("m/44'/0'/0'/0/0")
      // option 2, manually
      // const child = node.deriveHardened(44)
      //   .deriveHardened(0)
      //   .deriveHardened(0)
      //   .derive(0)
      //   .derive(0)

      // const keyPair = bitcoin.ECPair.fromWIF(child.toWIF())
      // const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
      // const { address: address1 } = bitcoin.payments.p2pkh({ pubkey: child.publicKey })

      // console.log('===== BtcWallet::fromMnemonic - bitcoin keyPair ', child.toWIF(), keyPair.toWIF(), address, address1);
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


class WalletManager {

  constructor() {

  }


  /*
   * 随机生成助记词
   * 
   */
  static generateMnemonic() {

    // federal tell shift mesh rough affair solve wrong video fold jelly season
    let mnemonic = bip39.generateMnemonic(); //generates string
    // let mnemonic = ethers.Wallet.createRandom().mnemonic;
    mnemonic = "mansion garden pupil calm language brown youth pottery piano neutral job labor";
    // assert(bip39.validateMnemonic(mnemonic));

    // const seed = bip39.mnemonicToSeedHex(mnemonic); //creates seed buffer
    // const entropy = bip39.mnemonicToEntropy(mnemonic);

    return {mnemonic/*, seed, entropy*/};
  }

  /*
   * 创建助记词钱包
   * 
   */
  static create({type = 'ETH', entropy, mnemonic, path = "m/44'/60'/1'/0/", index = 0}) {

    console.log('===== WalletManager::create - ', walletsObjects, mnemonic);
    
    if(mnemonic !== '') {
      // eth path
      let path = "m/44'/60'/0'/0/0";
      // path = path + index;
      let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic, path);
      
      console.log('===== WalletManager::create - mnemonicWallet ', mnemonicWallet, path);
      walletsObjects[type] = mnemonicWallet;

      
      // btc wallet
      walletsObjects['BTC'] = BtcWallet.fromMnemonic({mnemonic});

      console.log('===== WalletManager::create - mnemonicWallet getKeyPair() ', walletsObjects['BTC'].getKeyPair());

      let eosWallet = EosWallet.fromMnemonic({mnemonic});
      walletsObjects['EOS'] = eosWallet;
      console.log('===== WalletManager::create - mnemonicWallet EosWallet() ', eosWallet, eosWallet.getPrivateKey(), eosWallet.getPublicKey());

      return mnemonicWallet;
    }

   
    
    return {};
  }

  /*
   * 恢复助记词钱包
   * 
   */
  static resume({type = 'ETH', mnemonic = ''}) {

    return WalletManager.create(type, mnemonic);
  }

  /*
   * 加密保存钱包
   * 
   */
  static encrypt2Json({type = 'ETH', password}) {

    let mnemonicWallet = walletsObjects[type];
    if(mnemonicWallet && password) {
      return mnemonicWallet.encrypt(password);
    }
    return null;
  }

  static loadEncryptedJson({type = 'ETH', json, password}) {
    if(json && password) {
      return ethers.Wallet.fromEncryptedJson(json, password);
    }
    return null;
  }

};

export default WalletManager;