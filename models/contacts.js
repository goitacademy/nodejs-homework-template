
const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, '../models/contacts.json');



const listContacts = async () => {
    const data = await fs.readFile(contactsPath, "utf-8")
    return JSON.parse(data);
};
    
const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result ;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
    
};

const updateContact = async (contactId, data) => {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) {
        return null;
    }
    contacts[contactIndex] = { ...contacts[contactIndex], ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
    addContact,
  updateContact
}
//   updateContact,
// }
