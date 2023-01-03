const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

async function readContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

const listContacts = async () => {
  try {
    const contacts = await readContacts();
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts();
    const contact = await contacts.find((contact) => {
      contact.id === contactId;
    });
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
