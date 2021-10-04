const path = require("path");
const { v4: uuid } = require("uuid");
const readContacts = require("./readContacts");
const writeContacts = require("./writeContacts");

const contactsPath = path.join(__dirname, "./contacts.json");

const addContact = async (body) => {
  const id = uuid();
  const newContact = {
    id,
    ...body,
  };

  const contacts = await readContacts(contactsPath);
  contacts.push(newContact);
  await writeContacts(contactsPath, contacts);

  return newContact;
};

module.exports = { addContact };
