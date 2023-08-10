// const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  const contactsList = JSON.parse(data);

  return contactsList;
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();

  const findContactById = contactsList.find(
    (contact) => contact.id === contactId
  );

  if (!findContactById) {
    return null;
  }

  return findContactById;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
