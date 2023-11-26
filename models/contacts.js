// const Joi = require('joi');
const contactSchema = require('../schemas/contactsSchema');
const updateContactSchema = require('../schemas/updateContactSchema');

const path = require('path');
const fs = require('fs/promises');

const contactsPath = path.join(__dirname, './contacts.json');

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error reading contacts file');
  }
};

const writeContactsFile = async (data) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error('Error writing contacts file');
  }
};

const listContacts = async () => {
  return readContactsFile();
};

const getContactById = async (contactId) => {
  const contacts = await readContactsFile();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    throw new Error('Contact not found');
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readContactsFile();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) {
    throw new Error('Contact not found');
  }
  const removedContact = contacts.splice(index, 1)[0];
  await writeContactsFile(contacts);
  return removedContact;
};

const addContact = async (body) => {


  const validationResult = contactSchema.validate(body);
  if (validationResult.error) {
    throw new Error('Validation failed');
  }

  const contacts = await readContactsFile();

  const newContact = {
    id: Date.now().toString(),
    ...body,
  };

  contacts.push(newContact);

  await writeContactsFile(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
 

 const validationResult = updateContactSchema.validate(body);
  if (validationResult.error) {
    throw new Error('Validation failed');
  }

  const contacts = await readContactsFile();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) {
    throw new Error('Contact not found');
  }

  contacts[index] = { ...contacts[index], ...body };

  await writeContactsFile(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};