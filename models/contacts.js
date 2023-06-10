 const fs = require('fs/promises')
 const path = require("path");
 const  uuid  = require("uuid").v4;

const contactsPath= path.join(__dirname, 'contacts.json');

// console.log('contactsPath', contactsPath)

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  // console.log('contacts', contacts)
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  console.log("index", index);
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const contactNew = { id: uuid(), ...body };
  console.log("contactNew", contactNew);

  const result = contacts.push(contactNew);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index =contacts.findIndex(contact => contact.id === contactId);
  if (index === -1){
    return null;
  }
  contacts[index] = {contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
