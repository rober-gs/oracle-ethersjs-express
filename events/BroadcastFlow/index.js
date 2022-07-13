const streamBuffers = require('stream-buffers');
const FormData = require('form-data');
const fs = require('fs');

//const { getFile } = require("../../services/ipfsService");
const { compare } = require("../../services/modelsServices");
const { addRecord } = require("../../services/blockchainService");
 
const broadcasFlow = async({owner, uuid, cid, curp}) => {    

    const NODE_ACCOUNT = process.env.NODE_ACCOUNT;    

    if(owner == NODE_ACCOUNT) return;
    
    /**
     * Modelos Biometricos 
     */
    let dataBiometrics = new FormData();    
    dataBiometrics.append("curp", curp)
    dataBiometrics.append('imageQuery', fs.createReadStream(__dirname +'/img.png'));

    const result = await compare(dataBiometrics);

    /**
     * Middleware Blockchain
     */         
    const wsBuffer = new streamBuffers.WritableStreamBuffer({
        initialSize: (100 * 1024),   // start at 100 kilobytes.
        incrementAmount: (10 * 1024) // grow by 10 kilobytes each time buffer overflows.
    });

    wsBuffer.write(JSON.stringify(result));
    
    let dataBlockchain = new FormData();
    dataBlockchain.append('Curp', curp);
    dataBlockchain.append('Uuid', uuid);
    dataBlockchain.append('File', wsBuffer.getContents(), `${NODE_ACCOUNT}.json`);

    await addRecord(dataBlockchain);
}

module.exports = broadcasFlow;