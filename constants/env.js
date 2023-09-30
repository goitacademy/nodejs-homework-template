const dotenv = require("dotenv");

dotenv.config();

const { MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_HOST, MONGO_DB_DATABASE,JWT_SECRET,SENDGRID_TOKEN,SEND_FROM_EMAIL  } = process.env;

if (!MONGO_DB_USER) {
  throw new Error("Please setup MONGO_DB_USER");
}

if (!MONGO_DB_PASSWORD) {
  throw new Error("Please setup MONGO_DB_PASSWORD");
}

if (!MONGO_DB_PASSWORD) {
  throw new Error("Please setup MONGO_DB_PASSWORD");
}
if (! MONGO_DB_DATABASE) {
    throw new Error("Please setup  MONGO_DB_DATABASE");
  }
if(!JWT_SECRET){
  throw new Error("Please setup JWT_SECRET")
}
if(!SENDGRID_TOKEN){
  throw new Error("Please setup  SENDGRID_TOKEN")
}
if(!SEND_FROM_EMAIL ){
  throw new Error("Please setup    SEND_FROM_EMAIL")
}
module.exports = {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
  JWT_SECRET,
  SENDGRID_TOKEN,
  SEND_FROM_EMAIL 
};
