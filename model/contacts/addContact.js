/* eslint-disable semi */
/* eslint-disable quotes */
const { v4 } = require("uuid");
const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const addContact = async (data) => {
  const contacts = await listContacts();
  console.log(contacts);
  const newContact = { id: v4(), ...data };
  contacts.push(newContact);
  console.log(contacts);
  await updateContacts(contacts);
  console.log(contacts);
  return newContact;
};

module.exports = addContact;
