const { v4 } = require("uuid");

const listContacts = require("./listContacts");
const updateContactsList = require("./updateContactsList");

const addContact = async (body) => {
  try {
    const newContact = { id: v4(), ...body };
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContactsList(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
};

module.exports = addContact;
