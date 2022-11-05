const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/controllers");

const validationBody = require("../../middleware/validationBody.js");
const {
  schemaPostContact,
  schemaPutContact,
} = require("../../schema/schema.js");

router.get("/", getContacts);

router.get("/:contactId", getContactByID);

router.post("/", validationBody(schemaPostContact), postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validationBody(schemaPutContact), putContact);

module.exports = router;
