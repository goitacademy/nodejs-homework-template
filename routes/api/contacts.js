const express = require("express");
const {
  getContacts,
  getContactnbyId,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contacts");
const {
  validator,
} = require("../../middlewares/validation");
const { contactSchema } = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContactnbyId);
router.post("/", validator(contactSchema), postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validator(contactSchema), putContact);

module.exports = router;
