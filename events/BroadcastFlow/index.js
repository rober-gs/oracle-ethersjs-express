const axios = require('axios');
const FormData = require('form-data');
const streamBuffers = require('stream-buffers');
 
const API_METHOD                = "curp/participate";
const NODE_ACCOUNT              = process.env.NODE_ACCOUNT;        
const BIOMETRIC_HOST            = process.env.BIOMETRIC_HOST;
const BIOMETRIC_API_KEY         = process.env.BIOMETRIC_API_KEY;
const BIOMETRIC_URL_SERVICE     = process.env.BIOMETRIC_URL_SERVICE;
const BLOCKCHAIN_URL_SERVICE    = process.env.BLOCKCHAIN_URL_SERVICE;

const broadcasFlow = async({owner, uuid, cid, curp}) => {        

    if(owner == NODE_ACCOUNT) {
        console.log("📌📌📌 => This node send this search");        
        return
    };
    
    await exec(uuid, curp, cid);
    
}

const exec = async(uuid, curp, cid) => {

    console.log("Starting Proccess");        
    
    console.log("⏲️ => Ipfs download init:", new Date().toISOString());        

    const config = {
        
        url: `https://infura-ipfs.io/ipfs/${cid}`,
        method: 'GET',
        responseType: 'stream'

    }
    
    axios(config)
        .then( async({data})  => {        
            console.log("⏲️ => Ipfs download final:", new Date().toISOString());                            
            console.log("⏲️ => Biometricos API init:", new Date().toISOString());        
            
            const biometricData = new FormData();    
            biometricData.append("curp", curp);            
            biometricData.append("imageQuery", data, {filename:`${cid}.png`});

            const config = {
                method: 'post',
                url: BIOMETRIC_URL_SERVICE,
                headers: { 
                    'apikey': BIOMETRIC_API_KEY, 
                    'host': BIOMETRIC_HOST, 
                    ...biometricData.getHeaders()
                },
                data : biometricData
            };
            axios(config)
                .then(async({data}) => {                
                    console.log("⏲️ => Biometricos API final:", new Date().toISOString());        
                    /**
                     * Middleware Blockchain
                     */         
                    console.log("⏲️ => Blockchain middelware init:", new Date().toISOString());

                    const bufferJsonFile = new streamBuffers.WritableStreamBuffer({
                        initialSize: (100 * 1024),  
                        incrementAmount: (10 * 1024)
                    });
                    bufferJsonFile.write(JSON.stringify(data));    

                    let dataBlockchain = new FormData();
                    dataBlockchain.append('Curp', curp);
                    dataBlockchain.append('Uuid', uuid);
                    dataBlockchain.append('File', bufferJsonFile.getContents(), `${NODE_ACCOUNT}.json`);

                    const config = {
                        method: 'post',
                        url: `${BLOCKCHAIN_URL_SERVICE}${API_METHOD}`,
                        headers: { 
                            'accept': 'application/json', 
                            ...dataBlockchain.getHeaders()
                        },
                        data : dataBlockchain
                    };
                    axios(config)
                        .then(({data}) => {                    
                            console.log("⏲️ => Blockchain middelware final:", new Date().toISOString());                               
                            console.log("Ending Proccess");        
                        })
                        .catch((error) => console.log("middleware error -->", error));                    
                    

    
                })
                .catch((error) => console.log("biometricos error -->", error));                    
        })
        .catch((error) => console.log("ipfs error -->", error));    
}

module.exports = broadcasFlow;