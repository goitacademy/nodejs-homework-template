const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await listContacts());
});

router.get("/:contactId", getContactById);

router.delete("/:contactId", removeContact);

router.post("/", addContact);

router.put("/:contactId", updateContact);

module.exports = router;
