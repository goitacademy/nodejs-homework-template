const fs = require('fs/promises');
const { v4 } = require("uuid");
const path = require("path");

const pathToFile = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
    await fs.writeFile(pathToFile, JSON.stringify(contacts));
}
console.log(pathToFile)

const listContacts = async () => {
  const data = await fs.readFile(pathToFile);
  const contacts = JSON.parse(data);
    return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
    const result = contacts.find(items => items.id === contactId);
    if (!result) {
        return null
    }
    return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();  
    const idContact = contacts.findIndex(item => item.id === contactId);
    if (idContact === -1) {
        return null
    }
    const [removeContact] = contacts.splice(idContact, 1)
    await updateContacts(contacts);
    return removeContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();  
    const idContact = contacts.findIndex(item => item.id === id);
    if (idContact === -1) {
        return null
    }
    contacts[idContact] = { ...body, id}
    await updateContacts(contacts);
    return contacts[idContact];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
