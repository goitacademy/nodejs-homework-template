const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const updateFile = require("../../common/helpers/updateFile");
const contactsPath = require("../../common/paths");

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const contact = await getContactById(contactId);
  const newContactsList = contactList.filter(
    (contact) => String(contact.id) !== contactId
  );
  await updateFile(contactsPath, newContactsList);
  return contact;
};

module.exports = removeContact;
