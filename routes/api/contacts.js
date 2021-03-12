const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} = require("../../controllers/contacts-controller");
const validate = require("./validation");

router
  .get("/", getAllContacts)
  .post("/", validate.createContact, createContact);

router
  .get("/:contactId", getContactById)
  .delete("/:contactId", deleteContact)
  .patch("/:contactId", validate.updateContact, patchContact);

module.exports = router;
