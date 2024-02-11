const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const getContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const listContacts = async () => {
  try {
    const contacts = await getContacts();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContacts();
    const contactById = contacts.find((contact) => contact.id === contactId);

    if (contactById) {
      return contactById;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);
      const contactsJson = JSON.stringify(contacts, null, 2);
      await fs.writeFile(contactsPath, contactsJson, "utf-8");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await getContacts();
    const id = uuidv4();
    const newContact = {
      id,
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    const contactsJson = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, contactsJson, "utf-8");
    return newContact
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);

    if (index === -1) return;

    contacts[index] = { ...contacts[index], ...body };
    const contactsJson = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, contactsJson, "utf-8");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
