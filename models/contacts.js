const fs = require("fs/promises");
const path = require("path");
const { v1 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

const getContactById = async (contactId) => {
  try {
    const contactIdString = contactId.toString();

    const contacts = await listContacts();

    const contactById = contacts.find(
      (contact) => contact.id === contactIdString
    );
    console.log(contactById);
    if (contactById) {
      return contactById;
    }
    return null;
  } catch (error) {
    console.log(error);
     throw new Error("Internal Server Error");
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsById = await getContactById(contactId);
    if (!contactsById) {
      return contactsById;
    }
    const contactIdString = contactId.toString();
    const contacts = await listContacts();
    const newContacts = contacts.filter(
      (contact) => contact.id !== contactIdString
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return contactsById;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: v1(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsById = await getContactById(contactId);
    if (!contactsById) {
      return contactsById;
    }
    const contactIdString = contactId.toString();
    const contacts = await listContacts();
    const newContacts = contacts.filter(
      (contact) => contact.id !== contactIdString
    );
    const newContact = { id: contactId, ...body };
    newContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
