const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "./contacts.json");

const mutationData = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const dataID = data.find((x) => x.id === contactId);

  return dataID;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const removeID = data.findIndex((x) => x.id === contactId);

  if (removeID === -1) {
    return null;
  }

  const [removeContacts] = data.splice(removeID, 1);
  mutationData(data);
  return removeContacts;
};

const addContact = async (body) => {
  const newContacts = {
    id: uuidv4(),
    ...body,
  }

  const data = await listContacts();
  data.push(newContacts);
  mutationData(data);

  return newContacts;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const editingID = data.findIndex((x) => x.id === contactId);

  if (editingID === -1) {
    return null;
  }

  data[editingID] = { ...data[editingID], ...body };

  mutationData(data);

  return data[editingID];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
