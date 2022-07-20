const streamBuffers = require('stream-buffers');
const FormData = require('form-data');

const { detailSearch, addScore } = require("../../services/blockchainService");
const { getFile } = require("../../services/ipfsService");

const endBroadcastFlow = async({uuid}) => { 

    const NODE_ACCOUNT = process.env.NODE_ACCOUNT;    

    if(owner != NODE_ACCOUNT) {
        console.log("🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️ ~ This node not is owner this search ");        
        return
    };

    
   
    console.log("✅ [ + ] Start Get Detail for this search...");     

    const { records, search } = await detailSearch(uuid);

    console.log("[ - ] End Middleware");    

    let score = {};
    let i = 0;

    async function* asyncGenerator() {
        while (i <= records.length) yield i++;               
    }              
    const promises =  async function() {
        for await (let index of asyncGenerator()) {                    
            let recordIpfs =  await getFile(records[index].cid);
            score = {
                ...score, 
                [records[index].participant]: recordIpfs
            }
                
        }                
    };

    await promises();
    bufferJsonFile.write(JSON.stringify(score));   

    let data = new FormData();

    data.append('Curp', search.curp);
    data.append('Uuid', uuid);
    data.append('File', bufferJsonFile.getContents(), `${NODE_ACCOUNT}.json`);
    
    const setScore = addScore(data);

    console.log("🚀 ~ file: index.js ~ line 51 ~ endBroadcastFlow ~ setScore", setScore);
    

}

module.exports = endBroadcastFlow;