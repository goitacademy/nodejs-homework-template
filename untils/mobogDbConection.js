const mongoose = require("mongoose");
const {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE
} = require("../constants/env");
const setupConection  = async () => {
    try{
    console.log('first')
      let res = await  mongoose.connect(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}`);
      console.log(res)
}catch(e){
    console.log(e)
}
}

module.exports = setupConection