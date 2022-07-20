const axios = require('axios');

const getFile = (cid) => { 

    const IPFS_URL_SERVICE = process.env.IPFS_URL_SERVICE;
    const IPFS_API_METHOD = "cat?arg="

    const config = {
        method: 'post',
        url: `${IPFS_URL_SERVICE}${IPFS_API_METHOD}${cid}`,        
        headers: { }
    };

    return axios(config)
            .then(({data}) => data)
            .catch((error) => console.log("error -->", error));

}
const getFileBlob = (form, cid) => {    
    
    const IPFS_URL_SERVICE = process.env.IPFS_URL_SERVICE;
    const IPFS_API_METHOD = "cat?arg="

    const config = {
        method: 'post',
        url: `${IPFS_URL_SERVICE}${IPFS_API_METHOD}${cid}`,
        responseType: 'blob',
        headers: { }
    };

    return axios(config)
            .then(({data}) => {                
                let metadata = {
                    type: 'image/jpeg'
                };
                return form.append([data], "img.png", metadata);                
            })
            .catch((error) => console.log("error -->", error)); 
}

module.exports = {
    getFile,
    getFileBlob
};