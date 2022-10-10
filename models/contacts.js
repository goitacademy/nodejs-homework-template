const fs = require('fs/promises')
const path = require("path");
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, "./contacts.json");

const writeContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const getContactId = String(contactId);
  const contact = contacts.find( ({id}) => id === getContactId);
  return contact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const getContactId = String(contactId);
  const index = contacts.findIndex(contact => contact.id === getContactId );
  if(index === -1) {
    return null;
  }
  const [result] = contacts.splice(index,1);
  await writeContacts(contacts);
  return result;
}

const addContact = async ({name, email, phone}) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  const contacts = await listContacts();
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if(index === -1){
      return null;
  }
  contacts[index] = {id: contactId, ...body};
  await writeContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
