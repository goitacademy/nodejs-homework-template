const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve(__dirname,'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  };
};

const writeContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  };
};

const getById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact ?? null;
  } catch (error) {
    console.log(error);
  };
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      ...body,
      id: uuidv4(),
    };
    contacts.push(newContact);

    await writeContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  };
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const contactIdx = contacts.findIndex(
      contact => contact.id === contactId);
    if (contactIdx === -1) { return null };
    
    const [contact] = contacts.splice(contactIdx, 1);

    await writeContacts(contacts);

    return contact;
  } catch (error) {
    console.log(error);
  };
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();

    const contactIdx = contacts.findIndex(
      contact => contact.id === contactId);
    if (contactIdx === -1) { return null };
    
    const contact = { ...contacts[contactIdx], ...body };
    contacts[contactIdx] = contact;

    await writeContacts(contacts);

    return contact;
  } catch (error) {
    console.log(error);
  };
};


module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
