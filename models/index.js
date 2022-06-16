const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, 'contacts.json');

const updateContacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  if (!result) {
    return null;
  }
  return result;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    ...body,
    id:uuidv4()
  };
  contacts.push(newContact)
  await updateContacts(contacts);
  return newContact;
}

const updateContactById = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id };
  await updateContacts(contacts);
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
