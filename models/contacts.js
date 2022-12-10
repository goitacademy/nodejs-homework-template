const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve(__dirname, "./contacts.json");
async function writeContacts(contacts, index) {
  await fs.promises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  return await fs.promises
    .readFile(contactsPath, "utf8")
    .then(JSON.parse)
    .catch(console.error);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => {
    return contact.id === contactId;
  });
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex((item) => {
    return item.id === contactId;
  });
  if (contactIndex === -1) return false;
  const contact = contacts[contactIndex];
  contacts.splice(contactIndex, 1);
  await writeContacts(contacts, 1);
  return contact;
}

async function addContact(body) {
  const { name, email, phone } = body;
  if (!name || !email || !phone) return false;
  const contacts = await listContacts();
  const contact = { id: Date.now(), name, email, phone };
  contacts.push(contact);

  await writeContacts(contacts, 2);
  return contact;
}

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
