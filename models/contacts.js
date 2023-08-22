const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const contactsPath = path.join(__dirname, 'contacts.json');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
});

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};
const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId);
  } catch (error) {
    throw error;
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  } catch (error) {
    throw error;
  }
};

const addContact = async body => {
  try {
    const { error } = contactSchema.validate(body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const contacts = await listContacts();
    const newContact = { id: uuidv4(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { error } = contactSchema.validate(body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...body };
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[index];
    } else {
      throw new Error('Contact not found');
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};