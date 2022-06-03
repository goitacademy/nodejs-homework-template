const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('models/contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(({ id }) => id === String(contactId)) || null
}

const removeContact = async (contactId) => {
  const contacts = await listContacts(); 
  const newContacts = await contacts.filter(({ id }) => id !== String(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return await listContacts();
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...body }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact
}

const updateContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  const newContact = {...contact, ...body};
  const contacts = await listContacts();

  contacts.forEach((contact, idx) => {
    if (contact.id === contactId){
      contacts[idx] = newContact;
    }
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
