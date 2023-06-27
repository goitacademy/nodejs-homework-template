const fs = require('fs/promises')
const contactsPath = 'contacts.json';
const { nanoid } = require('nanoid');


const listContacts = async () => {
  const contactsData = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(contactsData);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === id);
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
}

const addContact = async (contact) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...contact };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (id, updatedFields) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex !== -1) {
    contacts[contactIndex] = { ...contacts[contactIndex], ...updatedFields };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[contactIndex];
  } else {
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
