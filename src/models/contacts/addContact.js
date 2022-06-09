const fs = require("fs/promises");
const { v4 } = require("uuid");
const listContacts = require("./listContacts");
const contactsPaath = require("../contactsPaath");

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPaath, JSON.stringify(contacts));
  return newContact;
};

module.exports = addContact;
