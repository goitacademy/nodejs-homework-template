const updateFile = require("../../common/helpers/updateFile");
const contactsPath = require("../../common/paths");
const getContactById = require("./getContactById");
const listContacts = require("./listContacts");

const updateContact = async (contactId, body) => {
  const contactList = await listContacts();
  const { name, email, phone } = body;

  const updatedContactsList = contactList.map((contact) => {
    if (String(contact.id) === contactId) {
      console.log(email);

      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
    if (!contact) {
      return console.error("No such contact");
    }
    return contact;
  });

  await updateFile(contactsPath, updatedContactsList);

  const updatedContact = await getContactById(contactId);

  return updatedContact;
};

module.exports = updateContact;
