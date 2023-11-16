const mongoose = require("mongoose");
const Ctrl = require("../controllers/auth");
const joiUserSchemas = require("../schemas/userSchemas");
const BASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(BASE_URL)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function addUser(req, res, next) {
  const { password, email, subscription, token, owner } = req.body;
}

module.exports = {
  addUser,
};
