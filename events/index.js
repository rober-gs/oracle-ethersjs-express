const { ethers } = require("ethers");
const { abi } = require('../build/contracts/DicioAlliacePoc.json');

const broadcasFlow = require("./BroadcastFlow");
const endBroadcastFlow = require("./EndBroadcastFlow");

const oracleListener = () => {
    
    const PROVIDER                  = process.env.PROVIDER;
    const PROJECT_ID                = process.env.PROJECT_ID;
    const SMARTCONTRACT_ADDRESS     = "0xe391ff190a46176197b5e8b6d89b507c6f7404f1"; //process.env.SMARTCONTRACT_ADDRESS;

    const provider = new ethers.providers.InfuraProvider( PROVIDER, PROJECT_ID);
    const contract = new ethers.Contract(SMARTCONTRACT_ADDRESS, abi, provider);

    /**
     * 
     */
    contract.on("CreatedSearchEvent", (...params) => {        
        const {"0":owner, "1":uuid } = params;   
        console.log("🚩 ~ New Search:", uuid, "~ Account:", owner );        
    });
    /**
     * 
     */
    contract.on("BroadcastEvent", (...params) => {        
        const {"0":owner, "1":uuid, "2":cid, "3":curp} = params;   
        console.log("🚩 ~ Start Broadcast:", uuid);
        //broadcasFlow({owner, uuid, cid, curp});
    });
    /**
     * 
     */
    contract.on("ParticipateEvent", (...params) => {        
        const {"0":participant, "1":uuid, "3":id} = params;   
        console.log("🚩 ~ Participate:", uuid, "~ Account:", participant, "~ ID:", id);        
    });
    /**
     *  
     */    
    contract.on("BroadcastEndingEvent", (...params) => {        
        const {"0":owner, "1":uuid} = params;   
        console.log("🚩 ~ End Broadcast:", uuid);    
        //endBroadcastFlow({owner, uuid});    
    });
    /**
     *  
     */    
    contract.on("SetScoreEvent", (...params) => {        
        const {"0":uuid, "1":cid} = params;   
        console.log("🚩 ~ Set Score:", uuid, cid);            
    });





    /* const events = abi.filter( item => item.type === "event");
    
    console.log("🚀 ~ list of events to listen to ~");
    
    events.map( ({ name }) => {        

        console.log("👉 ~", name);
        

        contract.on(name, (...params) => {
            
            
            switch (name) {
                
                case "BroadcastEvent":
                    
                    
                    const {"0":owner, "1":uuid, "2":cid, "3":curp} = params;   

                    broadcasFlow({owner, uuid, cid, curp});
                    
                    break;            

                case "BroadcastEndingEvent":
                    
                    console.log("🚩 ~ BroadcastEvent ~");
                    //const {"0":owner, "1":uuid, "2":cid, "3":curp} = params;   

                    broadcasFlow({owner, uuid, cid, curp});
                    
                    break;            
                default:
                    console.log("🚀 ~ there is no flow for this event ~", name);
                    break;
            }

        });
    }); 
    }
    */
}

module.exports = {
    oracleListener
};