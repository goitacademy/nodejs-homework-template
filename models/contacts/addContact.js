const fs = require("fs/promises");
const { v4: generateId } = require("uuid");
const listContacts = require("./listContacts");
const contactsFilePath = require("./contactsFilePath");

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: generateId(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts));
  return newContact;
};

module.exports = addContact;
