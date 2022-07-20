const axios = require('axios');


const addRecord = (data) => { 
        
    const BLOCKCHAIN_URL_SERVICE = process.env.BLOCKCHAIN_URL_SERVICE;
    const API_METHOD = "curp/participate";

    const config = {
        method: 'post',
        url: `${BLOCKCHAIN_URL_SERVICE}${API_METHOD}`,
        headers: { 
            'accept': 'application/json', 
            ...data.getHeaders()
          },
        data : data
    };

    return axios(config)
        .then(({data}) => data)
        .catch((error) => console.log("error -->", error));    
}
const detailSearch = (uuid) => { 
    
    const BLOCKCHAIN_URL_SERVICE = process.env.BLOCKCHAIN_URL_SERVICE;
    const API_METHOD = "curp/searchDetail/";

    const config = {
        method: 'get',
        url: `${BLOCKCHAIN_URL_SERVICE}${API_METHOD}${uuid}`,
        headers: { 
            'accept': 'application/json'            
          },
        
    };

    return axios(config)
        .then(({data}) => data)
        .catch((error) => console.log("error -->", error));    
}
const addScore = (data) => { 
        
    const BLOCKCHAIN_URL_SERVICE = process.env.BLOCKCHAIN_URL_SERVICE;
    const API_METHOD = "curp/score";

    const config = {
        method: 'post',
        url: `${BLOCKCHAIN_URL_SERVICE}${API_METHOD}`,
        headers: { 
            'accept': 'application/json', 
            ...data.getHeaders()
          },
        data : data
    };

    return axios(config)
        .then(({data}) => data)
        .catch((error) => console.log("error -->", error));    
}

module.exports = {
    addRecord,
    detailSearch,
    addScore
};



