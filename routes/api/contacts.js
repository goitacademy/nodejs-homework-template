const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getContactId,
  postContact,
  putContact,
  deleteContact,
} = require("../../controllers/contacts-controller");

const { contactShema } = require("../../shemas");
const { validateBody } = require("../../decorators");

router.get("/", getAllContacts);
router.get("/:contactId", getContactId);
router.post("/", validateBody(contactShema), postContact);
router.put("/:contactId", putContact, validateBody(contactShema));
router.delete("/:contactId", deleteContact);

module.exports = router;
