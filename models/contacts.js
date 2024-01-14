const fs = require("fs").promises;
const path = require("path");

const contactPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile(contactPath);
    // console.log(JSON.parse(readContactList));
    return JSON.parse(readContacts);
  } catch (err) {
    console.log("List not loaded", err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const readContacts = await listContacts();
    const readContact = readContacts.find(
      (contact) => contact.id === contactId
    );
    return readContact;
  } catch (err) {
    console.log("Contact not found", err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const readContacts = await listContacts();
    const deleteContact = readContacts.find(
      (contact) => contact.id === contactId
    );
    const newContactslist = readContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactPath, JSON.stringify(newContactslist));
    return deleteContact;
  } catch (err) {
    console.log("Delete not found", err.message);
  }
};

const addContact = async (body) => {
  try {
    const readContacts = await listContacts();
    const newContact = body;
    const newContactslist = [...readContacts, newContact];
    await fs.writeFile(contactPath, JSON.stringify(newContactslist));
    return newContact;
  } catch (err) {
    console.log("Delete not found", err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const readContacts = await listContacts();
    const renameContact = readContacts.find(
      (contact) => contact.id === contactId
    );

    console.log(renameContact);
    if (body.name) {
      renameContact.name = body.name;
    }
    if (body.email) {
      renameContact.email = body.email;
    }
    if (body.phone) {
      renameContact.phone = body.phone;
    }
    const newContacts = readContacts.filter(
      (contact) => contact.id !== contactId
    );
    console.log(renameContact);
    const newContactslist = [...newContacts, renameContact];
    await fs.writeFile(contactPath, JSON.stringify(newContactslist));
    return renameContact;
  } catch (err) {
    console.log("Delete not found", err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
