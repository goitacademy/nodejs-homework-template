const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    const contactToFind = contacts.find((contact) => contact.id === contactId);
    return contactToFind;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    const contactToDelete = contacts.find(
      (contact) => contact.id === contactId
    );

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 1));
    return contactToDelete;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };

  try {
    const data = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    const updatedContacts = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 1));
  } catch (error) {
    console.log(error.message);
  }

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  try {
    const data = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(data);

    const indexToFind = await contacts.findIndex(
      (contact) => contact.id === contactId
    );
    const contactToUpdate = contacts[indexToFind];

    contactToUpdate.name = name;
    contactToUpdate.email = email;
    contactToUpdate.phone = phone;

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
    return contacts[indexToFind];
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
