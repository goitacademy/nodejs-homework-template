const fs = require('fs/promises')
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (id) => {
    const contactId = String(id);
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id === contactId);
  return contact || null;
}

const removeContact = async (id) => {
    const contactId = String(id);
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === contactId);
    const deletedContact = allContacts[index];

    if (index !== -1) {
        allContacts.splice(index, 1);
        
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    }
  return deletedContact || null;
}

const addContact = async (data) => {
    const newContact = {
        id: uuid.v4(),
        ...data
    };
    const allContacts = await listContacts();
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
}

const updateContact = async (id, data) => {
  const contactId = String(id);
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
