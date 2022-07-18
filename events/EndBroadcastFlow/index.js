const { detailSearch } = require("../../services/blockchainService");

const endBroadcastFlow = async({uuid}) => { 

    const NODE_ACCOUNT = process.env.NODE_ACCOUNT;    

    if(owner != NODE_ACCOUNT) {
        console.log("🚀 ~ This node not send this search ");        
        return
    };

    console.log("✅  ~ Get Detail for this search...");    

    /**
     * Middleware Blockchain
     */      
    const data = await detailSearch(uuid);
    console.log("🚀 ~ file: index.js ~ line 12 ~ ScoreFlow ~ data", data);

}

module.exports = endBroadcastFlow;