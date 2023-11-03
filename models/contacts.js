const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

function generateUniqueId() {
  // Generador de ID
  const timestamp = Date.now().toString();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomNumber}`;
}



const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
    
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact ? [contact] : 'Contact not found';
  } catch (error) {
    console.error(error);
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((c) => c.id === contactId);
    
    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return 'Contact removed successfully';
    } else {
      return 'Contact not found';
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = {
      id: generateUniqueId(),
      ...body,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return 'Contact added successfully.';
  } catch (error) {
    console.error(error);
    return error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex !== -1) {
      contacts[contactIndex] = {
        ...contacts[contactIndex],
        ...body,
      };

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return 'Contact updated successfully';
    } else {
      return 'Contact not found';
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
