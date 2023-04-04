const dotenv = require('dotenv');
const path= require("path");

let config;

exports.getConfig =()=>{
    if(config){
        return config
    }

     dotenv.config({path:path.join(__dirname,"./env")});

     config = {
       db: { url: process.env.MONGODB_URL },
       bcryptCostFactor: parseInt(process.env.BCRYPT_COST_FACTOR),
       jwt: {
         secret: process.env.JWT_SECRET,
         expiresIn:process.env.JWT_EXPIRES_IN
       },
     };
     return config;
}