const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const parsedContactsList = JSON.parse(data);

  return parsedContactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = await contacts.find(({ id }) => id === contactId.toString());

  if (!result) {
    return null;
  }

  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId.toString());

  if (idx === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removeContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
