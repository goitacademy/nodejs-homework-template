const { v4 } = require("uuid");
const fs = require("fs/promises");
const updateContact = require("./updateContact");
const listContacts = require("./listContacts");



const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = { ...data, id: v4() };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};


module.exports = addContact;
