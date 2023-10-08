const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const ourContact = contacts.find((contact) => contact.id === contactId);
  return ourContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const remContact = await getContactById(contactId);
  if (remContact) {
    const contactIndex = contacts.indexOf(remContact);
    contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return remContact;
  }
  return null;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const ourContactIdx = contacts.findIndex(
    (contact) => contact.id === id
  );
  if (ourContactIdx === -1) {
    return null;
  }
  contacts[ourContactIdx] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[ourContactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
