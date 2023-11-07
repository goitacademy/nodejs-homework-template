const { readDB, writeDb } = require("../utils/db");
const crypto = require("node:crypto");
const {
  createContactsValidationSchema,
  updateContactsValidationSchema,
} = require("../utils/validation/contactsValidationSchema");
// const express = require('express')
// const app = express()

const listContacts = async (req, res, next) => {
  const contacts = await readDB();
  res.json(contacts).status(200);

};

const getContactById = async (req, res, next) => {
  const contacts = await readDB();
  const { id } = req.params;
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(contact);
};

const addContact = async (req, res, next) => {
  const { error } = createContactsValidationSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: `${error}` });
  }
  const contacts = await readDB();
  const newContact = { ...req.body, id: crypto.rendomUUID() };
  contacts.push(newContact);
  await writeDb(contacts);
  res.status(201).json(newContact);
};

const removeContact = async (req, res, next) => {
  const contacts = await readDB();
  const { id } = req.params;
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }
  contacts.splice(contactIndex, 1);
  await writeDb(contacts);
  res.sendStatus(204);
};

const updateContact = async (req, res, next) => {
  const { error } = updateContactsValidationSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: `${error}`});
  }
  const contacts = await readDB();
  const { id } = req.params;
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }
  contacts.splice(contactIndex, 1, { ...contacts[contactIndex], ...req.body });
  await writeDb(contacts);
  res.status(200).json(contacts[contactIndex]);
};

// app.listen(3001)

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
