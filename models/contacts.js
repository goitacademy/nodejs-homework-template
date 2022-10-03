const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const updateList = async list => {
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
};

async function listContacts(path = contactsPath) {
  const data = await fs.readFile(path, 'utf-8');
  return JSON.parse(data) || null;
}

async function getContactById(contactId) {
  const list = await listContacts();
  return list.find(el => el.id == contactId) || null;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const index = list.findIndex(el => el.id == contactId);
  if (index === -1) return null;
  const [result] = list.splice(index, 1);
  await updateList(list);
  return result || null;
}

async function addContact({ name, email, phone }) {
  const list = await listContacts();
  const id = String(+list[list.length - 1].id + 1);
  const newContact = { id, name, email, phone };
  list.push(newContact);
  await updateList(list);
  return newContact || null;
}

const updateContact = async (contactId, body) => {
  const list = await listContacts();
  const indexOfContact = list.findIndex(el => el.id == contactId);
  list[indexOfContact] = body;
  await updateList(list);
  return list[indexOfContact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
