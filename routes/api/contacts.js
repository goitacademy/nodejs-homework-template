const express = require("express");
const { checkId } = require("../../middlewares/contactsMiddleware");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts });
});

router.use("/:contactId", checkId);

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  await removeContact(req.params.contactId);
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);
  res.status(200).json(updatedContact);
});

module.exports = router;
