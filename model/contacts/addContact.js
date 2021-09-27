const shortid = require("shortid");
const fs = require("fs/promises");
const path = require("path");

const getListContacts = require("./getListContacts");

const contactsPath = path.resolve("db/contacts.json");

const addContact = async (data) => {
  try {
    const contacts = await getListContacts();
    const newContact = { id: shortid.generate(), ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = addContact;