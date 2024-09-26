const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getContactId,
  postContact,
  putContact,
  deleteContact,
} = require("../../controllers/contacts-controller");

const { contactSchema } = require("../../schemas");
const { validateBody } = require("../../decorators");

router.get("/", getAllContacts);
router.get("/:contactId", getContactId);
router.post("/", validateBody(contactSchema), postContact);
router.put("/:contactId", validateBody(contactSchema), putContact);
router.delete("/:contactId", deleteContact);

module.exports = router;
