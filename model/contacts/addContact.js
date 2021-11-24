const { v4 } = require("uuid");

const updateContacts = require("../updateContacts");
const listContacts = require("./listContacts");

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { ...data, id: v4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  //   if (!newContact) {
  //     return null;
  //   }
  return newContact;
};

module.exports = addContact;
