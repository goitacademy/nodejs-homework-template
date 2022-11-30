const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const listContacts = async () => {
  const contactListBuffer = await fs.readFile(contactsPath);
  const contactList = JSON.parse(contactListBuffer);
  return contactList;
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contactById = contactList.find(({ id }) => id === contactId.toString());
  if (!contactById) {
    return null;
  }
  // console.log(contactById);
  return contactById;
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};
// getContactById(3);
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
