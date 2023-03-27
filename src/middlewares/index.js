const contactValidation = require("./contactsValidation");
const {
  userValidation,
  userVerificationValidation,
} = require("./userValidation");
const auth = require("./auth");
const upload = require("./upload");

module.exports = { contactValidation, userValidation, auth, upload, userVerificationValidation };
