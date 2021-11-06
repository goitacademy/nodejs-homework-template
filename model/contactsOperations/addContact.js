const { v4 } = require("uuid");
const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

const getAllContacts = require("./getAllContacts");

const addContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = { ...data, id: v4() };

  contacts.push(newContact);

  const contactsStr = JSON.stringify(contacts, null, 2);

  await fs.writeFile(contactsPath, contactsStr);
  return newContact;
};

module.exports = addContact;
