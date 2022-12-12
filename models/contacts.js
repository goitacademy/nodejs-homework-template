const fs = require('fs/promises')
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
   const contacts = await fs.readFile(contactsPath, "utf-8");
   return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id == contactId);
  return result || null;
}

const addContact = async({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: String(contacts.length + 1),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === String(contactId));
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  console.log(contacts);
  const index = contacts.findIndex(contact => contact.id === String(contactId));
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
