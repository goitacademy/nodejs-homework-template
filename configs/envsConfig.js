require('dotenv').config();

const { DB_HOST, SECRET} = process.env;


module.exports = {
  dbHost: DB_HOST,
  secret: SECRET
}