const { addValidation, addFavValidation } = require("./contactValidation");
const addUserValidation = require("./userValidation");
const auth = require("./auth");

module.exports = { addValidation, addFavValidation, addUserValidation, auth };
