const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = async () => {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contactsData);
}

const listContacts = async () => {
    return await readContacts();
}

const getContactById = async (contactId) => {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
}

const removeContact = async (contactId) => {
    const contacts = await readContacts();
    const filteredContact = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContact));
    await readContacts();
}

const addContact = async (body) => {
    const contacts = await readContacts();
    const newContact = { id: nanoid(), ...body };
    await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
    return newContact;
}

const updateContact = async (contactId, body) => {
    const contacts = await readContacts();
    const findContact = contacts.find((contact) => contact.id === contactId);
    const changedContact = { ...contacts[findContact], ...body};
    contacts[findContact] = changedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return changedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
