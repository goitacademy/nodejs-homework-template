const express = require("express");
const { addContactValidate } = require('./../../utils/validator.js');
const {
  listContacts,
  getContactById,
  addContact,
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
  if (error) return res.status(400).json({ message: `${error.details[0].message}` });
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const contacts = await listContacts();
  const lastId =
    Math.max(...contacts.map((contact) => parseInt(contact.id, 10))) + 1;
  const newContact = { id: lastId.toString(), name, email, phone };
  contacts.push(newContact);
  await addContact(contacts);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;

