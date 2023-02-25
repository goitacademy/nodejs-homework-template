const getAllContacts = require("./getAllContacts");
const contactsPath = require("./contactsPath");
const fs = require("fs/promises");

const removeContact = async (contactId) => {
  try {
    const contacts = await getAllContacts();
    const idx = contacts.findIndex(
      (item) => String(item.id) === String(contactId)
    );
    if (idx === -1) {
      return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removeContact;
  } catch (err) {
    return console.log(err.message);
  }
};

module.exports = removeContact;
