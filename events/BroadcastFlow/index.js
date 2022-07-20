const streamBuffers = require('stream-buffers');
const FormData = require('form-data');
const fs = require('fs');

//const { getFileBlob } = require("../../services/ipfsService");
const { compare } = require("../../services/modelsServices");
const { addRecord } = require("../../services/blockchainService");
 
const broadcasFlow = async({owner, uuid, cid, curp}) => {    

    const NODE_ACCOUNT = process.env.NODE_ACCOUNT;    

    if(owner == NODE_ACCOUNT) {
        console.log("📌📌📌 => This node send this search <=");        
        return
    };
    /**
     *  Get Img From IPFS
    */
    // console.log("✅ ~ Start Request To IPFS ...");            
    
    // let imgFile = await getFileBlob(dataBiometrics, cid, `${curp}_${NODE_ACCOUNT}.png`);
    
    /**
     * Modelos Biometricos 
     */
    console.log("✅ [ + ] Start Request To Backend.");        
    
    let dataBiometrics = new FormData();    
    dataBiometrics.append("curp", curp);    
    //dataBiometrics.append('imageQuery', imgFile);
    dataBiometrics.append('imageQuery', fs.createReadStream(__dirname +'/img.png'));

    const result = await compare(dataBiometrics);
    console.log("[ - ] End Back");    

    /**
     * Middleware Blockchain
     */         
    console.log("✅ [ + ] Start Request To Middleware Blockchain.");        
    const bufferJsonFile = new streamBuffers.WritableStreamBuffer({
        initialSize: (100 * 1024),  
        incrementAmount: (10 * 1024)
    });

    bufferJsonFile.write(JSON.stringify(result));    

    let dataBlockchain = new FormData();
    dataBlockchain.append('Curp', curp);
    dataBlockchain.append('Uuid', uuid);
    dataBlockchain.append('File', bufferJsonFile.getContents(), `${NODE_ACCOUNT}.json`);

    await addRecord(dataBlockchain);

    console.log("[ - ] End Middleware.");   
}

module.exports = broadcasFlow;