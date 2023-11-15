const fs = require('fs/promises');
const path = require('path');

const contactsFilePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
    const contacts = JSON.parse(contactsData);
    return contacts;
  } catch (error) {
    console.error('Error reading contacts file:', error.message);
    throw error;
  }
};

const getContactById = async contactId => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
    const contacts = JSON.parse(contactsData);

    const contact = contacts.find(
      c => c.id.toString() === contactId.toString()
    );

    return contact;
  } catch (error) {
    console.error('Error reading contacts file:', error.message);
    throw error;
  }
};

const removeContact = async contactId => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
    const contacts = JSON.parse(contactsData);
    const updatedContacts = contacts.filter(c => c.id !== contactId);
    await fs.writeFile(
      contactsFilePath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return true;
  } catch (error) {
    console.error('Error updating contacts file:', error.message);
    throw error;
  }
};

const addContact = async body => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
    const contacts = JSON.parse(contactsData);

    const newContact = { id: Date.now().toString(), ...body };
    contacts.push(newContact);

    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    console.error('Error updating contacts file:', error.message);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, 'utf-8');
    const contacts = JSON.parse(contactsData);

    const index = contacts.findIndex(
      c => c.id.toString() === contactId.toString()
    );

    if (index === -1) {
      throw new Error('Contact not found');
    }

    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;

    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (error) {
    console.error('Error updating contacts file:', error.message);
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
