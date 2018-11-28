
import EosWallet from './EosWallet';
import BtcWallet from './BtcWallet';
import { ethers } from 'ethers';
import ecc from 'eosjs-ecc';

import { encrypt, decrypt, shallowCopy, isSecretStorageWallet } from './secretWallet';

var bip39 = require('bip39');
const assert = require('assert')


// let mnemonicDefault = "radar blur cabbage chef fix engine embark joy scheme fiction master release";
// let mnemonicDefault = "mansion garden pupil calm language brown youth pottery piano neutral job labor";

export default class HdWallet {

  constructor({ethWallet, btcWallet, eosWallet}) {

    this.type = 'ETH';
    this.path = "m/44'/60'/0'/0/0";

    // this.wallets = {};
    this.ethWallets = { 'ETH' : ethWallet };
    
    this.eosWallets = { 'EOS' : eosWallet };

    this.btcWallets = { 'BTC' : btcWallet };

  }

  randomBtcAddresses(pos) {
    let btcAddresses = [];

    const btcWallet = this.btcWallets['BTC'];
    // console.log('===== HdWallet::randomAddresses - btcWallet > ', btcWallet);
    if(btcWallet) {
      for(var index = 1; index <= pos; index++) {
        // console.log('===== HdWallet::randomAddresses - index > ', index);
        const wallet = btcWallet.deriveChild(index);
        btcAddresses.push({pubkey: wallet.getAddress(), wallet});
      }
    }
    return btcAddresses;
  }

  randomEosAddresses(pos = 1) {
    let keyPairs = [];

    const eosWallet = this.eosWallets['EOS'];
    // console.log('===== HdWallet::randomAddresses - eosWallet > ', eosWallet);
    if(eosWallet) {
      for(var index = 1; index <= pos; index++) {
        // console.log('===== HdWallet::randomAddresses - eosWallet - index > ', index);
        const wallet = eosWallet.deriveChild(index);
        assert(ecc.isValidPrivate(wallet.getPrivateKey()), 'EOS priv not valid!');
        assert(ecc.isValidPublic(wallet.getPublicKey()), 'EOS priv not valid!');
        keyPairs.push({pubkey: wallet.getPublicKey() , wallet});
      }
    }
    return keyPairs;
  }


  /*
   * 随机生成助记词
   * 
   */
  static generateMnemonic() {

    // federal tell shift mesh rough affair solve wrong video fold jelly season
    // let mnemonic = bip39.generateMnemonic(); //generates string
    let mnemonic = ethers.Wallet.createRandom().mnemonic;
    // mnemonic = mnemonicDefault;
    assert(bip39.validateMnemonic(mnemonic), "not valid mnemonic pharse!");

    // const seed = bip39.mnemonicToSeedHex(mnemonic); //creates seed buffer
    // const entropy = bip39.mnemonicToEntropy(mnemonic);

    return {mnemonic/*, seed, entropy*/};
  }

  /*
   * 创建助记词钱包
   * 
   */
  static create({mnemonic}) {

    // console.log('===== HdWallet::create - mnemonic > ', mnemonic);
    
    if(mnemonic) {
      
      // eth wallet
      const ethWallet = ethers.Wallet.fromMnemonic(mnemonic);
      // btc wallet
      const btcWallet = BtcWallet.fromMnemonic({mnemonic});
      // eos wallet
      const eosWallet = EosWallet.fromMnemonic({mnemonic});

      // console.log('===== HdWallet::create - wallets eth> \n', ethWallet, 
      //   '\n===== HdWallet::create - wallets btc> \n', btcWallet, 
      //   '\n===== HdWallet::create - wallets eos> \n', eosWallet);

      return new HdWallet({ethWallet, eosWallet, btcWallet});
    }

    return {};
  }

  /*
   * 恢复助记词钱包
   * 
   */
  static resume({mnemonic}) {

    if(mnemonic) {

      assert(bip39.validateMnemonic(mnemonic), "not valid mnemonic pharse!");
      return HdWallet.create(mnemonic);
    }

    return {};
  }

  /*
   * 加密保存钱包
   * 
   */
  encrypt2Json({password}) {

    let encryptWallets = [];
    if(password) {
      
      // eth
      let mnemonicWallet = this.ethWallets['ETH'];
      if(mnemonicWallet) {
        encryptWallets.push(this.encrypt(mnemonicWallet, password));
      }

      // btc
      let mnemonicWallets = this.btcWallets;
      for(var index in mnemonicWallets) {

        let wallet = mnemonicWallets[index];
        encryptWallets.push(wallet.encrypt(password));
      }

      // eos
      mnemonicWallets = this.eosWallets;
      for(var index in mnemonicWallets) {
        
        let wallet = mnemonicWallets[index];
        encryptWallets.push(wallet.encrypt(password));
      }

      return Promise.all(encryptWallets);
    }

    
    return null;
  }

  encrypt(wallet, password, options, progressCallback) {
    // console.log('+++++HdWallet::encrypt - type: ', wallet.type || 'ETH', wallet);

    if (typeof(options) === 'function' && !progressCallback) {
      progressCallback = options;
      options = {};
    }

    if (progressCallback && typeof(progressCallback) !== 'function') {
        throw new Error('invalid callback');
    }

    if (!options) { options = {}; }

    let _This = wallet;
    if (_This.mnemonic) {
        // Make sure we don't accidentally bubble the mnemonic up the call-stack
        options = shallowCopy(options);

        // Set the mnemonic and path
        options.mnemonic = _This.mnemonic;
        options.path = _This.path;
        options.type =  wallet.type || 'ETH'; // default eth wallet
        options.seed = _This.seed;
        options.index = _This.index;
    }

    return encrypt(_This.privateKey, password, options, progressCallback);
  }


  /*
   * 解密JSON钱包
   * 
   */
  loadEncryptedJson({json, password, progressCallback}) {
    if(json && password) {
      
      let wallet = null;

      let type ='ETH';
      try { type = JSON.parse(json).type } catch( e ) { type = 'ETH' };
      
      // console.log('+++++HdWallet::loadEncryptedJson - type ', type);
      if(type === 'BTC') {
        wallet = BtcWallet.fromEncryptedJson(json, password, progressCallback);

      }
      else if(type === 'EOS') {
        wallet = EosWallet.fromEncryptedJson(json, password, progressCallback);

      } 
      else {
        wallet = HdWallet.fromEncryptedJson(json, password, progressCallback);
      }

      if(wallet) {
        // this.setWallet({type, wallet});
        return wallet;
      }
      
    }
    return null;
  }

  static fromEncryptedJson(json, password, progressCallback) {
    
    if (isSecretStorageWallet(json)) {

        return decrypt(json, password, progressCallback).then(function(signingKey) {
          // console.log('+++++HdWallet::fromEncryptedJson - signingKey ', signingKey);
            return new ethers.Wallet(signingKey);
        });
    }

    return Promise.reject('invalid wallet JSON');
  }

  setWallet({type = 'ETH', wallet}) {

    if(type === 'ETH')  
      this.ethWallets['ETH'] = wallet;
    if(type === 'EOS')  
      this.eosWallets[wallet.getPublicKey()] = wallet;
    if(type === 'BTC')  
      this.btcWallets[wallet.getAddress()] = wallet;
  }

  static importEosPriv(priv) {
    // console.log('===== HdWallet::importEosPriv - priv > ', priv);
    const eosWallet = EosWallet.fromPrivateKey(priv);
  }

};

