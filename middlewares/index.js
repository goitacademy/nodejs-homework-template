const { addValidation, addFavValidation } = require("./contactValidation");
const addUserValidation = require("./userValidation");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  addValidation,
  addFavValidation,
  addUserValidation,
  auth,
  upload,
};
