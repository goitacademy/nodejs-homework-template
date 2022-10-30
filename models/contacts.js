const fs = require("fs/promises");

const { nanoid } = require("nanoid");

const contacts = require("./contacts.json");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  return contacts.filter(({ id }) => id === contactId);
};

const removeContact = async (contactId) => {
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  } else {
    contacts.splice(index, 1);

    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

    return contacts;
  }
};

const addContact = async (body) => {
  const id = nanoid();

  const newContact = { id, ...body };
  contacts.push(newContact);

  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

  return contacts;
};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const updateContact = { ...contacts[index], ...body };
  contacts[index] = updateContact;

  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));

  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
