const updateContactsList = require("./updateContactsList");
const listContacts = require("./listContacts");

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(
      (item) => String(item.id) === String(contactId)
    );
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter(
      (item) => String(item.id) !== String(contactId)
    );
    await updateContactsList(newContacts);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

module.exports = removeContact;
