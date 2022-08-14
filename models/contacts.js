const fs = require("fs").promises;
const path = require("path");

const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath); 
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if(idx === -1){
    return null;
  } 
  const [result] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return result;
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if(contactId === -1){
    return null;
  } 
  contacts[idx] = {name, email, phone};
  await updateContacts(contacts);
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
