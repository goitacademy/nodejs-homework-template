const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const [contact] = contacts.filter(item => item.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    const parcedContacts = JSON.parse(contacts);
    const newContact = {
      id: (parcedContacts.length + 1).toString(),
      name,
      email,
      phone,
    };
    const addContact = [...parcedContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(addContact), 'utf-8');
    return getContactById(newContact.id);
  } catch (error) {
    console.log(error);
  }
};  

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      'utf-8'
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
      return null;
    }

    contacts[index] = { id, ...body };

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      'utf-8'
    );

    return contacts[index];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
