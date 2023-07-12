const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const shemas = require("../../shemas/contactSchema");
const {
  getContacts,
  getContactsById,
  addContact,
  deleteContact,
  updateContactById,
} = require("../../controlers");

router.get("/", getContacts);

router.get("/:id", getContactsById);

router.post("/", validateBody(shemas.contactSchema), addContact);

router.delete("/:id", deleteContact);

router.put("/:id", validateBody(shemas.contactSchema), updateContactById);

module.exports = router;
