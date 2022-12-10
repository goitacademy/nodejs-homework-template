const fs = require('fs/promises')
const path = require('path');

const contactsPath = path.join(__dirname, '/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
        const normId = String(contactId);
        const contacts = await listContacts();
        const contactById = contacts.find(contact => contact.id === normId)
        return contactById || null;
}

const removeContact = async (contactId) => {
        const normId = String(contactId);
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === normId);
        if (index === -1) {
            return null;
        }
        const [removedContact] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removedContact;
}

const addContact = async (newContact) => {
        const contacts = await listContacts();
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
}

const updateContact = async (id, body) => {
        const normId = String(id);
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === normId);
        if (index === -1) {
            return null;
        }
        contacts[index] = { id, ...body };
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
