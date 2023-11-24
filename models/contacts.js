const path = require("path");

const fs = require("fs/promises");

const contactsPath = path.resolve(__dirname, "contacts.json");

function Parcer(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

const listContacts = async () => {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));
  return Parcer(data);
};

const getContactById = async (contactId) => {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));

  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (contactFound) return contactFound;
  else return null;
};

const removeContact = async (contactId) => {};

const addContact = async (newContact) => {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));

  const updatedArr = [...Parcer(data), newContact];

  await fs
    .writeFile(contactsPath, JSON.stringify(updatedArr))
    .catch((e) => console.log(e.message));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
