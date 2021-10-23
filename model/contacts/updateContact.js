const getAll = require("./listContacts");
const updateContacts = require("./updateAllContacts");

const updateContact = async (contactId, updateInfo) => {
  try {
    const contacts = await getAll();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { ...contacts[idx], ...updateInfo };

    await updateContacts(contacts);
    return contacts[idx];
  } catch (err) {
    return err.message;
  }
};

module.exports = updateContact;
