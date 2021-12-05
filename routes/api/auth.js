const express = require("express");
const {
  schemaAddContact,
  schemaUpdateContact,
} = require("../../schemas/contact");
const { controlWrapper, validation } = require("../../middlewares");
const { auth: controllerContacts } = require("../../controller");
const router = express.Router();

router.post("/signup", controlWrapper(controllerContacts.signup));

module.exports = router;
