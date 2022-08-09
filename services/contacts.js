const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contact = contactsList.find(item => item.id === contactId.toString());
  if (!contact) {
    return null;
  }
  return contact;
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(item => item.contactId === contactId)
  if (index === -1) {
    return null;
  }
  const [removedContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return removedContact;
}

const addContact = async ({name, phone, email}) => { 
  const contactsList = await listContacts();
  const newContact = {
    contactId: nanoid(),
    name,
    phone,
    email,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

const updateContact = async (contactId, {name, phone, email}) => { 
  const contactsList = await listContacts();
  const index = contactsList.findIndex(item => item.contactId === contactId);
  if (index !== -1) {
    return null;
  };
  contactsList[index] = { contactId, name, phone, email };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
