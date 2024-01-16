const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const contactsPath = path.join(__dirname, '../models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);

    if (contact) {
      return contact;
    } else {
      throw new Error('Not found');
    }
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(data);

    contacts = contacts.filter((contact) => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return 'Contact deleted';
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const validationResult = schema.validate({ name, email, phone });

  if (validationResult.error) {
    throw new Error(`Missing required ${validationResult.error.details[0].context.key} - field`);
  }

  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  if (!name && !email && !phone) {
    throw new Error('Missing fields');
  }

  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(data);

    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);

    if (contactIndex !== -1) {
      contacts[contactIndex] = {
        ...contacts[contactIndex],
        name: name || contacts[contactIndex].name,
        email: email || contacts[contactIndex].email,
        phone: phone || contacts[contactIndex].phone,
      };

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[contactIndex];
    } else {
      throw new Error('Not found');
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
  updateContact,
};
