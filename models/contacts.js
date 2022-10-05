const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require("nanoid")
const contactsPath = path.join(__dirname, "./contacts.json")

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return null;
    }
    const [filteredContacts] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return filteredContacts;
  } catch (error) {
    console.log(error);
  }
}

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = {id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = {id: contactId, name, email, phone};
    await updateContacts([...contacts]);
    return contacts[index];
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
