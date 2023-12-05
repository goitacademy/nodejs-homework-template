const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
  const AllContacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(AllContacts);
}

async function getContactById(contactId) {
  const AllContacts = await listContacts();
  const CurrentContact = AllContacts.find(
    (contact) => contact.id === contactId
  );
  return CurrentContact || null;
}

async function removeContact(contactId) {
  const AllContacts = await listContacts();
  const index = AllContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = AllContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(AllContacts, null, 2));
  return result;
}

async function addContact(data) {
  const AllContacts = await listContacts();
  const NewContact = {
    id: nanoid(),
    ...data,
  };
  AllContacts.push(NewContact);
  await fs.writeFile(contactsPath, JSON.stringify(AllContacts, null, 2));
  return NewContact;
}
async function updateContact(contactId, data) {
  const AllContacts = await listContacts();
  const index = AllContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  AllContacts[index] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(AllContacts, null, 2));
  return AllContacts[index];
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
