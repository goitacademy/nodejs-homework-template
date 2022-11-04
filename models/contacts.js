const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('models/contacts.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
};

const writeFile = async (data) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data), 'utf8');
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

const listContacts = async () => {
  try {
    return await readFile();
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
  
  try {
    const data = await listContacts();
    const findContact = data.find(({ id }) => id === contactId);

    if (!findContact) {
      return false;
    } else {
      return findContact;
    }
  } catch (error) {
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newContacts = data.filter(({ id }) => id !== contactId);
    return await writeFile(newContacts);
  } catch (error) {
    return error;
  }
};

const addContact = async (body) => {
  try {
    const data = await listContacts();
    const newContact = {
      id: new Date().getTime().toString(),
      ...body,
    };
    data.push(newContact);
    await writeFile(data);
    return newContact;
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const index = data.findIndex(({ id }) => id === contactId);
    if (index >= 0) {
      data[index] = { id: contactId, ...body };
      return (await writeFile(data)) ? data[index] : null;
    } else {
      return false;
    }
  } catch (error) {
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
