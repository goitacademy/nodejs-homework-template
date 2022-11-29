const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById({ id }) {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === id);
  if (!findContact) {
    return null;
  }
  return findContact;
}

async function removeContact({ id }) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  const newContactsList = [...contacts, newContact];
  await updateContacts(newContactsList);
  return newContact;
}
async function updateContactById(id, body) {
  let contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await updateContacts(contacts);
  return contacts[index];
}

async function updateContacts(newContacts) {
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    "utf8"
  );
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
