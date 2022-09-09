require("dotenv").config();
const { DB_HOST, SECRET_KEY, } = process.env;

module.exports = {
    DB_HOST,
    SECRET_KEY,
};