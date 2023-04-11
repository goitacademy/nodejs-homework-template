const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === id);

    if (!contact) {
      return null;
    }

    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const removeContact = contacts.find((contact) => contact.id === id);

    if (!removeContact) {
      return null;
    }

    const newContactList = contacts.filter((contact) => contact.id !== id);
    fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
    return removeContact;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === id);

    if (contactIndex === -1) {
      return null;
    }

    contacts[contactIndex] = {
      id,
      ...body,
    };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
