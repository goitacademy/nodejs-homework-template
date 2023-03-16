const fs = require("fs/promises");
const path = require("path");
const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(6).max(22).required(),
});
const user = {
  name: "adam",
  email: "adam@interia.pl",
  phone: "575872435",
};
const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const foundContact = contactsList.find((contact) => contact.id === contactId);
  return foundContact;
};

const addContact = async (body) => {
  // console.log(body);
  console.log(addContactSchema.validate(user));
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const filtredContacts = JSON.stringify(
    contactsList.filter((contact) => contact.id !== contactId)
  );
  fs.writeFile(contactsPath, filtredContacts);
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
