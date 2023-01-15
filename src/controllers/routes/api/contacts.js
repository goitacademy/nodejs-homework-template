const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../cont.controllers");
const {
  updateContactValidation,
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

// const validator = require("express-joi-validation").createValidator({});

router
  .get("/", listContacts)
  .get("/:id", getContactById)
  .post("/", addContactValidation, addContact)
  .delete("/:id", removeContact)
  .put("/:id", updateContactValidation, updateContact);

module.exports = router;
