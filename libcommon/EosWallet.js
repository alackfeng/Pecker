import hdkey from 'hdkey'
import ecc from 'eosjs-ecc'
import wif from 'wif'
import { Buffer } from 'safe-buffer'
import eos from 'eosjs'
import bip39 from 'bip39'
import assert from 'assert'
import secp256k1 from 'secp256k1'


export default class EosWallet {

  constructor ({ seed, extendedKey, privateKey, chainId }) {
    if (seed) {
      this._seed = seed
      this._node = hdkey.fromMasterSeed(Buffer(seed, 'hex'))
    } else if (extendedKey) {
      this._seed = null
      this._node = hdkey.fromExtendedKey(extendedKey)
    } else {
      assert.equal(privateKey.length, 32, 'Private key must be 32 bytes.')
      assert(secp256k1.privateKeyVerify(privateKey), 'Invalid private key')
      this._seed = null
      this._node = {
        _publicKey: secp256k1.publicKeyCreate(privateKey, true),
        _privateKey: privateKey
      }
    }
    this._chainId = chainId || 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    this.type = 'EOS';
    this.path = "m/44'/194'/0'/0/0";
  }

  static generateMnemonic () {
    return bip39.generateMnemonic()
  }

  static fromMnemonic ({mnemonic, chainId}) {
    const seed = bip39.mnemonicToSeedHex(mnemonic)
    return new this({ seed, chainId })
  }

  static fromMasterSeed (seed, chainId) {
    return new this({ seed, chainId })
  }

  static fromExtendedKey (extendedKey, chainId) {
    return new this({ extendedKey, chainId })
  }

  static fromPrivateKey ({key, chainId}) {
    const privateKey = wif.decode(key).privateKey
    return new this({ privateKey, chainId })
  }

  derivePath (path) {
    assert(this._node.derive, 'can not derive when generate from private / public key')
    this._node = this._node.derive(path || this.path)
    const extendedKey = this._node.privateExtendedKey || this._node.publicExtendedKey
    return new EosWallet({ extendedKey, chainId: this._chainId })
  }

  deriveChild (index) {
    assert(this._node.deriveChild, 'can not derive when generate from private / public key')
    this._node = this._node.deriveChild(index)
    const extendedKey = this._node.privateExtendedKey || this._node.publicExtendedKey
    return new EosWallet({ extendedKey, chainId: this._chainId })
  }

  getPrivateExtendedKey () {
    assert(this._node.privateExtendedKey, 'can not get xpriv when generate from private / public key')
    return this._node.privateExtendedKey
  }

  getPublicExtendedKey () {
    assert(this._node.publicExtendedKey, 'can not get xpub when generate from private / public key')
    return this._node.publicExtendedKey
  }

  getPublicKey () {
    return ecc.PublicKey(this._node._publicKey).toString()
  }

  getPrivateKey () {
    return wif.encode(128, this._node._privateKey, false)
  }

}
