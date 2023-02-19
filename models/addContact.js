const fs = require("fs").promises;
const path = require("path");
const { v4: id } = require("uuid");
const listContacts = require('./listContacts');

const contactsPath = path.join(__dirname, '..', 'db', "contacts.json");

const addContact = async (body) => {
  const newContact = { ...body, id: id() };
  const { name, email, phone } = body;

  const parsedContacts = await listContacts();

  const nameToFind = parsedContacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  const emailToFind = parsedContacts.find(
    (contact) => contact.email.toLowerCase() === email.toLowerCase()
  );
  const phoneToFind = parsedContacts.find((contact) => contact.phone === phone);

  if (nameToFind || emailToFind || phoneToFind) {
    return null;
  }

  const newList = [...parsedContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, "\t"), "utf8");

  return newContact;
};

module.exports = addContact;