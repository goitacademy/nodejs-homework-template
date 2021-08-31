const { v4 } = require("uuid");

const listContacts = require("./listContacts");
const toUpdateContacts = require("./toUpdateContacts");

const addContact = async (body) => {
  const newContact = { ...body, id: v4() };
  const contacts = await listContacts();
  contacts.push(newContact);
  await toUpdateContacts(contacts);
  return newContact;
};

module.exports = addContact;
