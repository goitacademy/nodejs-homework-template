const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");

    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const searchedContact = parsedContacts.find(
      (contact) => contact.id === contactId
    );

    return searchedContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const newContacts = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    const updateContacts = [...newContacts];
    return updateContacts;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    parsedContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
    console.log(parsedContacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const parsedContacts = JSON.parse(contacts);
  const [contact] = parsedContacts.filter((el) => el.id === contactId);
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  return contact;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
