

const { ethers } = require("ethers");
const { abi } = require('../../build/contracts/DicioAlliacePoc.json');

const broadcasFlow = require("./BroadcastFlow")

const oracleListener = () => {
    
    const PROVIDER                  = process.env.PROVIDER;
    const PROJECT_ID                = process.env.PROJECT_ID;
    const SMARTCONTRACT_ADDRESS     = process.env.SMARTCONTRACT_ADDRESS;

    const provider = new ethers.providers.InfuraProvider( PROVIDER, PROJECT_ID);
    const contract = new ethers.Contract(SMARTCONTRACT_ADDRESS, abi, provider);

    const events = abi.filter( item => item.type === "event");
    
    console.log("🚀 ~ list of events to listen to ~");
    
    events.map( ({ name }) => {        

        console.log("👉 ~", name);
        

        contract.on(name, (...params) => {

            switch (name) {
                case "BroadcastEvent":
                    
                    const {"0":owner, "1":uuid, "2":cid, "3":curp} = params;                   
                    
                    broadcasFlow({owner, uuid, cid, curp});
                    
                    break;            
                default:
                    console.log("🚀 ~ there is no flow for this event ~", name);
                    break;
            }

        });
    });



}

module.exports = {
    oracleListener
};