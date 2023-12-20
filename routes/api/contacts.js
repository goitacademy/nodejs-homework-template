const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactBodySchema,
  putContactsSchema,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const { error } = contactBodySchema.validate(body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const { name, email, phone } = body;
  const newContact = await addContact(name, email, phone);

  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const removedContact = await removeContact(contactId);
  console.log(removedContact);
  if (!removedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const { error } = putContactsSchema.validate(body);
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const updatedContact = await updateContact(contactId, body);
  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(updatedContact);
});

module.exports = router;
