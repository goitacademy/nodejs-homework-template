const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  };

const getContactById = async (contactId) => {
const contacts = await listContacts();
const contact = contacts.find(item => item.id === contactId);
return contact || null;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const indexContact = contacts.findIndex(item => item.id === contactId);
  
    if (indexContact === -1) return null;
  
    const [result] = contacts.splice(indexContact, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  };
  
  const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  };

  const updateContactById = async (id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex (item => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = {id, ...data};
  await updateContacts(contacts);
return contacts[index];
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById,
  } 
