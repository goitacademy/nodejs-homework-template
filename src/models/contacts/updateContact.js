const fs = require("fs/promises");
const contactsPath = require("./contactsPath");
const getAllContacts = require("./getAllContacts");

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getAllContacts();
    const idx = contacts.findIndex(
      (item) => String(item.id) === String(contactId)
    );
    if (idx === -1) {
      return null;
    }

    if (!body) {
      return null;
    }
    contacts[idx] = { id: contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[idx];
  } catch (err) {
    return console.log(err.message);
  }
};

module.exports = updateContact;
