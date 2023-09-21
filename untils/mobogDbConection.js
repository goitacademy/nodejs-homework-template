const mongoose = require("mongoose");
const {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE
} = require("../constants/env");
const setupConection  = async () => {
    try{
      let res = await  mongoose.connect(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=AtlasApp`);
      console.log('Database connection successful')
}catch(e){
    console.log(e)
    process.exit(1)
}
}

module.exports = setupConection