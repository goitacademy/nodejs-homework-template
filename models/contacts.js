const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const Joi = require("joi");

const validateContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }

    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addContact = async (body) => {
  const contact = await listContacts();
  const { error, value } = validateContact.validate(body);

  if (error) {
    throw new Error(error.details[0].message);
  }
  const newContact = {
    id: crypto.randomUUID(),
    ...value,
  };
  contact.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contact = await listContacts();
  const index = contact.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const { error, value } = validateContact.validate(body);

  if (error) {
    throw new Error(error.details[0].message);
  }

  const updatedContact = { ...contact[index], ...value };
  contact[index] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
