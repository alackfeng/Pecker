
import * as ecc from "eosjs-ecc-rn";
import { ethers } from 'ethers';
import { defaultPath, HDNode, entropyToMnemonic, fromMnemonic } from 'ethers/utils/hdnode';
var bip39 = require('bip39');
var wordlists = require('bip39/wordlists/english');

const walletType = ['EOS', 'ETH', 'BTC'];


let walletsObjects = {};
let mnemonicDefault = "radar blur cabbage chef fix engine embark joy scheme fiction master release";


class WalletManager {

  constructor() {

  }


  /*
   * 随机生成助记词
   * 
   */
  static generateMnemonic() {

    let mnemonic = bip39.generateMnemonic(); //generates string

    const seed = bip39.mnemonicToSeedHex(mnemonic); //creates seed buffer
    const valid = bip39.validateMnemonic(mnemonic);
    const entropy = bip39.mnemonicToEntropy(mnemonic);
    // mnemonic = ethers.Wallet.createRandom().mnemonic;

    return {mnemonic, seed, entropy, valid};
  }

  /*
   * 创建助记词钱包
   * 
   */
  static create({type = 'ETH', mnemonic, path = "m/44'/60'/1'/0/", index = 0}) {

    console.log('===== WalletManager::create - ', walletsObjects, mnemonic);
    
    if(mnemonic !== '') {
      // eth path
      let path = "m/44'/60'/1'/0/0";
      // path = path + index;
      let mnemonicWallet = ethers.Wallet.createRandom(); //fromMnemonic(mnemonicDefault || mnemonic, path);
      
      console.log('===== WalletManager::create - mnemonicWallet ', mnemonicWallet, path);
      walletsObjects[type] = mnemonicWallet;
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