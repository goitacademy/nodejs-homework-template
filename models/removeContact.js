const fs = require("fs/promises");
const { contactsPath } = require("../helpers/index");
const listContacts = require("./listContacts");
const getContactById = require("./getContactById");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = await getContactById(contactId);
  if (!deletedContact) {
    return null;
  }
  const result = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return deletedContact;
};

module.exports = removeContact;
