const express = require("express");
const router = express.Router();
const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/cont.controllers");
const {
  updateContactValidation,
  addContactValidation,
} = require("../../middlewares/validationMiddleware");



router
  .get("/", listContacts)
  .get("/:id", getById)
  .post("/", addContactValidation, addContact)
  .delete("/:id", removeContact)
  .put("/:id", updateContactValidation, updateContact);

module.exports = router;
