const fs = require("fs").promises;
const {contactsPath} = require('../helpers');
const listContacts = require('./listContacts');


const removeContact = async (contactId) => {
  const parsedContacts = await listContacts();

  const newList = parsedContacts.filter((contact) => contact.id !== contactId);

  if (parsedContacts.length === newList.length) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, "\t"), "utf8");

  const contactsAfterRemove = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(contactsAfterRemove);
};

module.exports = removeContact;
