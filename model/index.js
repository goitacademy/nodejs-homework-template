const fs = require("fs/promises");
const contacts = require("/contacts.json");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(readContacts);
  } catch (error) {
    return console.log(`listContacts:${error}`);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactFilter = contacts.filter(
      (contact) => contact.id === Number(contactId)
    );
    return contactFilter;
  } catch (error) {
    return console.log(`getContactById:${error}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id === Number(contactId)
    );
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));

    return index;
  } catch (error) {
    return console.log(`removeContact:${error}`);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));

    return newContact;
  } catch (error) {
    return console.log(`addContact:${error}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id === Number(contactId)
    );
    const updatedContact = { ...contacts[index], ...body };
    contacts.splice(index, 1, updatedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));

    return updatedContact;
  } catch (error) {
    return console.log(`removeContact:${error}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
