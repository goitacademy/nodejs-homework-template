const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("models/contacts.json");

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(8).max(99).required(),
});

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);
  const contacts = await listContacts();
  const newContactList = contacts.filter((item) => item.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = await schema.validateAsync(body);
  const newContact = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  const updatedContact = contacts[contactIndex];
  const { name, email, phone } = await schema.validateAsync(body);
  updatedContact.name = name;
  updatedContact.email = email;
  updatedContact.phone = phone;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
