const listContacts = require("./listContacts");
const { v4: uuidv4 } = require("uuid");
const updateFile = require("../../common/helpers/updateFile");
const contactsPath = require("../../common/paths");

const addContact = async ({ name, email, phone }) => {
  const contactList = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contactList.push(newContact);
  await updateFile(contactsPath, contactList);
  return newContact;
};

module.exports = addContact;
