const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find((contact) => contact.id === contactId);
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const filterContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(filterContacts));
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();
    const user = { id: uuidv4(), ...body };
    allContacts.push(user);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const newContacts = allContacts.map((contact) => {
      if (contact.id === contactId) {
        return { ...contact, ...body };
      }
      return contact;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    const contactById = newContacts.find((contact) => contact.id === contactId);
    return contactById;
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
