const fs = require('fs/promises');
const Joi = require('joi');
const shortid = require('shortid');

const contactsPath = './models/contacts.json';

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
};

const addContact = async (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(body);

  if (error) {
    throw new Error(`Validation error: ${error.details.map((detail) => detail.message).join(', ')}`);
  }

  const newContact = {
    id: shortid.generate(),
    ...body,
  };

  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
  });

  const { error } = schema.validate(body);

  if (error) {
    throw new Error(`Validation error: ${error.details.map((detail) => detail.message).join(', ')}`);
  }

  const contacts = await listContacts();
  const updatedContactIndex = contacts.findIndex((contact) => contact.id === contactId);

  if (updatedContactIndex === -1) {
    return null;
  }

  const updatedContact = {
    ...contacts[updatedContactIndex],
    ...body,
  };

  contacts[updatedContactIndex] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
