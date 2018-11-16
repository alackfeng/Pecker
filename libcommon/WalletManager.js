
import * as ecc from "eosjs-ecc-rn";

const walletType = ['EOS', 'ETH', 'BTC'];

class Wallet {
  constructor(type) {
    this.type = type;
  }

  encrypt = ({ keys, encryption_key, password_pubkey }) => {
    this.keys = keys;
    this.encryption_key = encryption_key;
    this.password_pubkey = password_pubkey;
  }
};

class EosWallet extends Wallet {

  constructor(name) {
    super('EOS');

    this.name = name;
    this.keys = null;
    this.encryption_key = null;
    this.password_pubkey = null;
    this.chain_id = null;
  }
};

class EthWallet extends Wallet {

  constructor(name) {
    super('ETH');

    this.name = name;
  }
};

let walletsObjects = {};
let walletsAuths = {};
let defaultWallet = null;

class WalletManager {

  constructor() {

    this.state = {
      wallets: {},
      keys: {},
    };

    this.wallets = {};
  }


  static create({type = 'EOS', name = 'default', password = ''} = {}) {

    console.log('===== WalletManager::create - ', walletsObjects);
    // exist it, 

    // if(Object.keys(walletsObjects).includes(name))
    //   return;

    // password
    // Yue 5JhUVKGEC9JnjKaEeZWW1CJJeURz5Hy2LcFRNK1PVtSexUALcjV EOS6VTnLjC1bXAGxSB11p9dCFCRZKvcVWdhUDNMN9JoFvT99ZJ69F 5JbuZx3MFvUY1FkYoWdR1o8b4TRCZwQJQzCvrT6JwVdQgLzscVo

    const private_key = ecc.seedPrivate(password);
    const public_key = ecc.privateToPublic(private_key);
    const message = '5JbuZx3MFvUY1FkYoWdR1o8b4TRCZwQJQzCvrT6JwVdQgLzscVo';

    console.log('===== WalletManager::create - pri, pub, msg : ', private_key, public_key, message);

    const aesObject = ecc.Aes.encrypt(private_key, public_key, message);
    console.log('===== WalletManager::create - aesObject : ', aesObject.nonce, aesObject.checksum, aesObject.message);

    const aesdObject = ecc.Aes.decrypt(private_key, public_key, aesObject.nonce, aesObject.message, aesObject.checksum);
    console.log('===== WalletManager::create - aesdObject : ', aesdObject.toString());

    let walletObj = null;
    if(type === 'EOS') {
       walletObj = new EosWallet(name);
    } else if(type === 'ETH') {
      walletObj = new EthWallet(name);
    } else {
      walletObj = new EosWallet(name);
    }

    walletObj.encrypt({
      keys: aesObject, 
      encryption_key: aesObject, 
      password_pubkey: public_key
    });
    walletsObjects[name] = walletObj;
    walletsAuths[name] = false;
    defaultWallet = name;
    
  }

  static delete({name = 'default', password = ''}) {

    // exist it, 
    if(!Object.keys(walletsObjects).includes(name))
      return;

    // auth power
    const private_key = ecc.seedPrivate(password);
    const public_key = ecc.privateToPublic(private_key);

    const walletObj = walletsObjects[name];
    console.log('===== WalletManager::delete - walletObj : ', walletObj);
    if(walletObj.password_pubkey != public_key )
      return;

    // delete
    delete walletsObjects[name];
    delete walletsAuths[name];

  }

  static modify({name = 'default', password = '', newpassword}) {

  }

  static getWallets(type = '') {

    return Object.keys(walletsObjects);
  }

  static onLock({name, password}) {
    walletsAuths[defaultWallet] = true;
  }

  static isLocked({name}) {
    return !!(walletsAuths[defaultWallet]);
  }

  static unLock({name, password}) {
    // auth power

    // unlock 
    walletsAuths[defaultWallet] = false;
  }

};

export default WalletManager;