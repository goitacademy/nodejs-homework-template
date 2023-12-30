const fs = require('fs/promises')
const path = require('path');
const crypto = require('crypto');


const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const array = JSON.parse(data);
    return array;
  } catch (err) {
    console.error(err.message)
  }
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find(contact => contact.id === contactId);
  return contact
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const indexOfContact = data.findIndex(contact => contact.id === contactId);
    if (indexOfContact === -1) {
      return false;
    };
    const newArray = data.slice(0, indexOfContact).concat(data.slice(indexOfContact + 1));
    await fs.writeFile(contactsPath, JSON.stringify(newArray, null, 2));
    return true;
  } catch (err) {
    console.error(err.message)
  }
}

const addContact = async (body) => {
  try {
    const data = await listContacts();
    const contact = {
      id: crypto.randomUUID().toString(),
    ...body,
    };
    const newArray = data.concat(contact)
    await fs.writeFile(contactsPath, JSON.stringify(newArray, null, 2));
    return contact;
  } catch (err) {
    console.error(err.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await listContacts();
    const indexOfContact = data.findIndex(contact => contact.id === contactId);
    if (indexOfContact === -1) {
      return null;
    };

    const updatedContact = {
      id: contactId,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    data[indexOfContact] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return data[indexOfContact];
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
