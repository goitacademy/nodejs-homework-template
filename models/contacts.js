const fs = require("fs/promises");
const {nanoid} = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json")

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async contactId => {
    const contacts = await listContacts();
    return contacts.find(({id}) => id === contactId) || null;
}

const removeContactById = async contactId => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({id}) => id === contactId);
    if(idx < 0) {
        return null;
    }
    const removedContact = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
} 

const addContactToList = async body => {
    const contacts = await listContacts();
    const id = nanoid();
    const newContact = {id, ...body};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContactById = async (contactId, body) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({id}) => id === contactId);
    if(idx < 0) {
        return null;
    }
    contacts[idx] = {...contacts[idx], ...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContactToList,
  updateContactById,
}
