const uniqid = require("uniqid");

const getAllContacts = require("./getAllContacts");
const updateDataContacts = require("./updateDataContacts");

const addContact = async (body) => {
  const allContacts = await getAllContacts();

  const contactAdd = { id: uniqid(), ...body };
  allContacts.push(contactAdd);

  await updateDataContacts(allContacts);

  return contactAdd;
};

module.exports = addContact;
