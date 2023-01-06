const express = require("express");
const { addContactValidate } = require("./../../utils/validator.js");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  generateNewContact,
  getUpdatedContact,
  updateContact
} = require("./../../models/contacts.js");

const router = express.Router();

const test = async () => {
  console.log(await listContacts());
};

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) res.status(200).json(contact);
  if (!contact) res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = addContactValidate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  if (!name || !email || !phone)
    return res.status(400).json({ message: "missing required name field" });  
  const newContact = await generateNewContact(req.body);
  await addContact(req.body);
  res.status(201).send(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) res.status(404).json({ message: "Not found" });
  if (contact) {
    await removeContact(contactId);
    return res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  if (!name && !email && !phone) res.status(400).json({ message: "missing fields" });
  const contact = await getContactById(contactId);
  if (!contact) res.status(404).json({ message: "Not found" });
  if (contact) {
    const updatedContact = await getUpdatedContact(contact, req.body);
    await updateContact(contactId, req.body);
    res.status(200).send(updatedContact);
  }
});

module.exports = router;
