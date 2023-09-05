const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsList = await JSON.parse(contacts);
    return contactsList;
  } catch (err) {
    console.log(`Error Description>>> ${err.message}`);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = await contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return contactById;
  } catch (err) {
    console.log(`Error Description>>> ${err.message}`);
    return false;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactToRemove = await contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    if (!contactToRemove) {
      return null;
    }
    const newContactsList = await contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsList, null, 2),
      "utf8"
    );
    return newContactsList;
  } catch (err) {
    console.log(`Error Description>>> ${err.message}`);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };

    const newContactsList = [...contacts, newContact];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsList, null, 2),
      "utf8"
    );
    return newContact;
  } catch (err) {
    console.log(`Error Description>>> ${err.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = await contacts.map((contact) =>
      contact.id === contactId.toString() ? { ...contact, ...body } : contact
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf8"
    );
    const upDatedContact = await updatedContacts.find(
      (contact) => contact.id === contactId.toString()
    );
    if (!upDatedContact) {
      return null;
    }
    return upDatedContact;
  } catch (err) {
    console.log(`Error Description>>> ${err.message}`);
    return false;
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
