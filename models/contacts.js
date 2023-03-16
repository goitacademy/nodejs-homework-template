const fs = require("fs/promises");
const path = require("path");
// const Joi = require("joi");

// const addContactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.number().required(),
// });

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
  // console.log(addContactSchema.validate(body));
};

const removeContact = async (contactId) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
