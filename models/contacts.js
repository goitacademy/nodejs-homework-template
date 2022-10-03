const fs = require('fs/promises')
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, '/contacts.json');

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === contactId);
  return contactById;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return
  }

  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
}

const addContact = async (body) => {

  const contacts = await listContacts();
  contacts.push({ ...body, id: uuidv4() });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  const newContact = contacts[contacts.length - 1];
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const newContactList = contacts.map(contact =>
    contact.id === contactId ? { ...body, id: contactId } : contact);
  console.log(contactId)
  console.log(newContactList)
  await fs.writeFile(contactsPath, JSON.stringify(newContactList));

  const result = getContactById(contactId);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
