const { readFile, writeFile } = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("colors");

const baseDir = __dirname;
const fileName = "contacts.json";
const contactsPath = path.join(baseDir, fileName);

const contactsArray = () => {
  return readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch((error) => console.log(error.message.red));
};

const saveContactArray = (contacts) => {
  writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
    if (error) {
      console.error(error.message.red);
    }
  });
};

const listContacts = async () => {
  try {
    const contacts = await contactsArray();
    return contacts;
  } catch (error) {
    console.log(error.message.red);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await contactsArray();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw new Error(`The contact with id number ${contactId} does not exist`);
    } else {
      return contacts[index];
    }
  } catch (error) {
    console.log(error.message.red);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await contactsArray();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw new Error(`The contact with id number ${contactId} does not exist`);
    } else {
      const deleteContact = contacts.splice(index, 1);
      await saveContactArray(contacts);
      return deleteContact[0];
    }
  } catch (error) {
    console.log(error.message.red);
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await contactsArray();
    const findContact = contacts.findIndex(
      (contact) =>
        contact.name === name ||
        contact.email === email ||
        contact.phone === phone
    );
    if (findContact !== -1) {
      throw new Error("Contact with this data already exists");
    } else {
      contacts.push({
        id: uuidv4(),
        name,
        email,
        phone,
      });
      await saveContactArray(contacts);
      return contacts[contacts.length - 1];
    }
  } catch (error) {
    console.log(error.message.red);
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const contact = {
      id: contactId,
      name,
      email,
      phone,
    };
    const contacts = await contactsArray();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      contacts.push(contact);
      await saveContactArray(contacts);
      return contacts[contacts.length - 1];
    } else {
      contacts.splice(index, 1, contact);
      await saveContactArray(contacts);
      return contacts[index];
    }
  } catch (error) {
    console.log(error.message.red);
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
