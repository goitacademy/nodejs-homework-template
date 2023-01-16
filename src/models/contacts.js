const fs = require("fs/promises");
const path = require("path");

const contactPath = path.resolve("./src/models/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = data.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(data));
  return removeContact;
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();
  const newContact = {
    id: `${Date.now()}`,
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(data));
  return newContact;
}

async function updateContact(contactId, body) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { id: contactId, ...body };
  await fs.writeFile(contactPath, JSON.stringify(data));
  return data[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
