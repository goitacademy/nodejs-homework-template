const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

async function addContact(data) {
    const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data
  }

contacts.push(newContact);
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
return newContact;
}

async function updateById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
      return null;
  }
  contacts[index] = {id, ...data};
await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
return contacts[index];
}

module.exports = {
    listContacts,
    getById,
    removeContact,
    addContact,
    updateById,
}