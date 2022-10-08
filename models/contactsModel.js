const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function loadData() {
  const file = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(file) || [];
}

async function saveData(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  const data = await loadData();
  return data;
};

async function getContactById(contactId) {
  const data = await loadData();
  const contact = data.find((el) => el.id === String(contactId));
  return contact || null;
}

async function removeContact(contactId) {
  const data = await loadData();
  const index = data.findIndex(({ id }) => id === String(contactId));
  if (index === -1) return null;
  const [contact] = data.splice(index, 1);
  await saveData(data);
  return contact;
}

async function addContact(body) {
  const { name, email, phone } = body;
  const data = await loadData();
  const id = uuidv4();
  const contact = { id, name, email, phone };
  data.push(contact);
  await saveData(data);
  return contact;
}

const updateContact = async (contactId, body) => {
  const data = await loadData();
  const index = data.findIndex((el) => el.id === String(contactId));
  if (index === -1) return null;
  const contact = data[index];
  const updatedContact = { ...contact, ...body };
  data[index] = updatedContact;
  await saveData(data);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
