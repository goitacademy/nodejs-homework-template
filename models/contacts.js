const fs = require("fs/promises");

const path = require("path");

const { nanoid } = require("nanoid");
const { log } = require("console");

const contactsPath = path.join(__dirname, "contacts.json");
async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const results = contacts.find((item) => item.id === contactId);
  console.log(`results111`, results);
  return results || null;
}

async function updateContact(contactId, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...data };
  await updateContacts(contacts);
  return contacts[index];
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  updateContact(contacts);
  return newContact;
}

const removeContact = async (contactId) => {
  console.log(contactId);
  const contacts = await listContacts();
  console.log(contacts);
  const index = contacts.findIndex(
    (contact) => contact.contactId === contactId
  );
  console.log(index);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
