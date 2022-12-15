const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  phone: Joi.string()
    .regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
    .required(),
});

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);

  if (!parsedContacts.length) {
    throw createError(404, "Contacts list is empty.");
  }

  return parsedContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id === contactId);

  if (!contactById) {
    throw createError(404, "Not found");
  }

  return contactById;
};

const addContact = async (body) => {
  const { error } = contactsSchema.validate(body);
  if (error) {
    throw createError(400, error.message);
  }

  const contacts = await listContacts();
  const newContacts = { id: uuidv4(), ...body };
  contacts.push(newContacts);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContacts;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndexToRemove = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndexToRemove === -1) {
    throw createError(404, "Not found");
  }

  const deletedContact = contacts.splice(contactIndexToRemove, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const { error } = contactsSchema.validate(body);
  if (error) {
    throw createError(400, error.message);
  }
  const contacts = await listContacts();
  const contactByIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactByIndex === -1) {
    throw createError(404, "Not found");
  }
  contacts[contactByIndex] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[contactByIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
