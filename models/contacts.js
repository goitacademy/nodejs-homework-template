const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {

    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;

};

const getContactById = async (contactId) => {
  
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result;

};

const removeContact = async (contactId) => {
  
    const contactToDelete = getContactById(contactId);
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1 ) {
      return null;
    };

    contacts.splice(contactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contactToDelete;

};

const addContact = async (body) => {
  
    const contacts = await listContacts();
    const addContact = { id: v4(), ...body };
    contacts.push(addContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return addContact;

};

const updateContact = async (contactId, body) => {

    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1 ) {
      return null;
    };

    contacts[contactIndex] = { id: contactId, ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    const contactUpdated = contacts[contactIndex];

    return contactUpdated;

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
