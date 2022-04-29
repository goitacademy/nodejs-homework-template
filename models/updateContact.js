const fs = require("fs/promises");
const { contactsPath } = require("../helpers/index");
const listContacts = require("./listContacts");

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  result.name = name;
  result.email = email;
  result.phone = phone;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return result;
};

module.exports = updateContact;
