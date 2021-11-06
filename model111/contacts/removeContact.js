const contactsData = require("./contactsData");
const updateContacts = require("./updateContacts");

const removeContact = async (contactId) => {
  const contacts = await contactsData();
  const newContacts = contacts.filter(
    (contact) => String(contact.id) !== contactId
  );
  if (newContacts.length === contacts.length) {
    return null;
  } else {
    await updateContacts(newContacts);
    return await contactsData();
  }
};

module.exports = removeContact;
