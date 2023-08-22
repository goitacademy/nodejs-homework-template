const fs = require("fs/promises");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const contactsFilePath = path.join(__dirname, "contacts.json");

const saveContacts = async (contacts) => {
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    await saveContacts(contacts);
    return true;
  }
  return false;
};

const addContact = async (body) => {
  const { error } = contactSchema.validate(body);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    ...body,
  };
  contacts.push(newContact);
  await saveContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { error } = contactSchema.validate(body);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await saveContacts(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
