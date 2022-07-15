const { detailSearch } = require("../../services/blockchainService");

const endBroadcastFlow = async({uuid}) => { 

    const NODE_ACCOUNT = process.env.NODE_ACCOUNT;    
    if(owner != NODE_ACCOUNT) return;

    /**
     * Middleware Blockchain
     */      
    const data = await detailSearch(uuid);
    console.log("🚀 ~ file: index.js ~ line 12 ~ ScoreFlow ~ data", data);
    



}

module.exports = endBroadcastFlow;