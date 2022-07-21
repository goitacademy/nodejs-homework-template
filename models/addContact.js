const getAll = require("./listContacts");

const { nanoid } = require("nanoid");

const updateContacts = require("./updateContacts");

const addContact = async (body) => {
  const contacts = await getAll();

  const newContact = {
    id: nanoid(),
    ...body,
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

module.exports = addContact;
