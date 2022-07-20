const axios = require('axios');


const compare = (data) => { 

    const BIOMETRIC_HOST        = process.env.BIOMETRIC_HOST;
    const BIOMETRIC_API_KEY     = process.env.BIOMETRIC_API_KEY;
    const BIOMETRIC_URL_SERVICE = process.env.BIOMETRIC_URL_SERVICE;
    
    const config = {
        method: 'post',
        url: BIOMETRIC_URL_SERVICE,
        headers: { 
            'apikey': BIOMETRIC_API_KEY, 
            'host': BIOMETRIC_HOST, 
            ...data.getHeaders()
          },
        data : data
    };

    return axios(config)
        .then(({data}) => data)
        .catch((error) => console.log("error -->", error));    
}

module.exports = {
    compare
};