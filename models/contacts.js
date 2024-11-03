const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const contactsPath = './models/contacts.json';

const validationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'pl'] } }).required(),
  phone: Joi.string().required(),
});

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error('Error reading contacts:', err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId) || null;
  } catch (err) {
    throw new Error(`Error finding contact with ID ${contactId}:`, err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);

    if (contacts.length === updatedContacts.length) {
      console.log(`Contact with ID ${contactId} not found.`);
      return;
    }

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`Contact with ID ${contactId} has been removed.`);
  } catch (err) {
    throw new Error(`Error removing contact with ID ${contactId}:`, err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const { error } = validationSchema.validate({ name, email, phone });
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('Contact has been added:', newContact);
    return newContact;
  } catch (err) {
    throw new Error('Error adding contact:', err.message);
  }
}

async function updateContact(contactId, body) {
  try {
    const { error } = validationSchema.validate(body);
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === contactId);
    if (contactIndex === -1) return null;

    const updatedContact = { ...contacts[contactIndex], ...body };
    contacts[contactIndex] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (err) {
    throw new Error(`Error updating contact with ID ${contactId}:`, err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
