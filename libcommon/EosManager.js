
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs';

const defaultPrivateKey = ["5JbuZx3MFvUY1FkYoWdR1o8b4TRCZwQJQzCvrT6JwVdQgLzscVo", '5J4j8MJdhiHGmJ26CGTHvqMWYeYNMTEL6itTaxXFPAUpPfPm61L']; // useraaaaaaaa
const defaultRpcUrl = 'http://127.0.0.1:8000';

class EosManager {

  constructor({prviateKeys, rpcUrl }) {
    console.log("===== EosManager::constructor - ");

    this.signatureProvider = new JsSignatureProvider(prviateKeys || defaultPrivateKey);
    this.rpc = new JsonRpc(rpcUrl || defaultRpcUrl, { fetch });
    this.api = new Api({  rpc: this.rpc,  signatureProvider: this.signatureProvider, /*textDecoder: new TextDecoder(), textEncoder: new TextEncoder()*/ });
  
    this.RpcError = RpcError;
  }

  async getinfo() {

    try {

      const result = await this.rpc.get_info();
      console.log('\n===== EOS get_info : ' + JSON.stringify(result));
      
      return {info: result};

    } catch (e) {
      console.log('\nCaught exception get_info: ' + e);
      if (e instanceof this.RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      return {error: e.json};
    }
    return 'ok';
  }

  async getAccount(name) {

    try {

      const result = await this.rpc.get_account(name);
      return {info: result};

    } catch (e) {
      console.log('\nCaught exception get_account: ' + e);
      if (e instanceof this.RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      return {error: e.json};
    }

  }

  async getBlock(height) {

    try {

      console.log('===== EosManager::getBlock - ', this.rpc);
      const result = await this.rpc.get_block(height);
      return {info: result};

    } catch (e) {
      console.log('\nCaught exception get_block: ' + e);
      if (e instanceof this.RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      return {error: e.json};
    }

  }

  async getTransaction(id) {

    try {

      console.log('===== EosManager::getTransaction - ', this.rpc);
      const result = await this.rpc.history_get_transaction(id);
      return {info: result};

    } catch (e) {
      console.log('\nCaught exception history_get_transaction: ' + e);
      if (e instanceof this.RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      return {error: e.json};
    }

  }

  async getTunnelInfos({type=1, lower=0, upper=100}) {

    const infosContract = "peckersinfos";
    const infosScope = "peckersinfos";
    const infosTable = "infos";

    try {

      console.log('===== EosManager::getTunnelInfos - ', "this.rpc");
      const result = await this.rpc.get_table_rows({
        code: infosContract,
        scope: infosScope,
        table: infosTable,
      });
      return {info: result};

    } catch (e) {
      console.log('\nCaught exception getTunnelInfos : get_table_rows -  ' + e);
      if (e instanceof this.RpcError)
        console.log(JSON.stringify(e.json, null, 2));
      return {error: e.json};
    }
  }


};

export default new EosManager({});