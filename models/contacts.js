const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid')

const Path = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const contactsAll = await fs.readFile(Path);
    return JSON.parse(contactsAll);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.filter(contact => contact.id === contactId);
  // console.log(contact.length);
  return contact.length === 0 ? null : contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) return null;

  const deletedContact = contacts.splice(index, 1);
  try {
    await fs.writeFile(Path, JSON.stringify(contacts));
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (contact) => {
  const contacts = await listContacts();
  const {name, email, phone } = contact;
  const id = nanoid();
  const newContact = {id, name, email, phone }
  contacts.push(newContact)
  try {
    await fs.writeFile(Path, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, updateContact) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...updateContact };

  try {
    await fs.writeFile(Path, JSON.stringify(contacts));
    return contacts[index];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
   listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
