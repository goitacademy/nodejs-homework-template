const updateAllContacts = require("./updateAllContacts");
const getAll = require("./listContacts");

const removeContact = async (id) => {
  try {
    const contacts = await getAll();
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter((item) => item.id !== id);
    await updateAllContacts(newContacts);
    return contacts[idx];
  } catch (err) {
    return err.message;
  }
};

module.exports = removeContact;
