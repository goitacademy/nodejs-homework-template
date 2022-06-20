const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { postValidate, updateValidate } = require("../../middleware/validate");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  if (contacts.length === 0) {
    return res.status(400).json({ message: "contacts not found" });
  }
  res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  console.log("~ contact", contact);
  if (contact.length === 0) {
    return res.status(404).json({
      message: `Contact with id: "${contactId}" does't exist. Please try again!`,
    });
  }
  return res.status(200).json({ contact });
});

router.post("/", postValidate, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  addContact(body);
  res.status(201).json({ body });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactToDelete = await removeContact(contactId);
  return res
    .status(contactToDelete.status)
    .json({ message: contactToDelete.message });
});

router.put("/:contactId", updateValidate, async (req, res, next) => {
  const { contactId } = req.params;

  if (!Object.keys(req.body)) {
    return res.status(400).json({ message: "missing fields" });
  }
  const uptContact = await updateContact(contactId, req.body);

  if (updateContact.message === 400) {
    res.status(uptContact.status).json({ message: updateContact.message });
  }

  return res.status(200).json({ ...uptContact });
});

module.exports = router;
