const listContacts = require("./getAll");
const updateContacts = require("./updateDB");
const uniqid = require("uniqid");

const add = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: uniqid() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = add;
