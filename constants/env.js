const dotenv = require("dotenv");

dotenv.config();

const { MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_HOST, MONGO_DB_DATABASE,JWT_SECRET } = process.env;

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
module.exports = {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
  JWT_SECRET
};
