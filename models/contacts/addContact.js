const { nanoid } = require("nanoid");
const getListContacts = require("./getListContacts");
const overWriteList = require("./overWriteList");

const addContact = async (body) => {
  const newContact = { id: nanoid(), ...body };
  const contacts = await getListContacts();
  const changedList = [newContact, ...contacts];
  await overWriteList(changedList);
  return newContact;
};

module.exports = addContact;
