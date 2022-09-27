const { nanoid } = require("nanoid");
const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const addContact = async (body) => {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(10),
    ...body,
  };

  allContacts.push(newContact);

  await updateContacts(allContacts);

  return newContact;
};

module.exports = addContact;
