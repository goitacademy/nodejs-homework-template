const { v4 } = require("uuid");

const updateContact = require("./updateContact");
const getAll = require("./listContacts");

const addContact = async (body) => {
  const newContact = { ...body, id: v4() };
  const contacts = await getAll();
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
};

module.exports = addContact;
