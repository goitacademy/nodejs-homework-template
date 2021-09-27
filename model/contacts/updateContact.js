const fs = require("fs/promises");
const path = require("path");

const getListContacts = require("./getListContacts");

const contactsPath = path.resolve("db/contacts.json");

const updateContact = async (contactId, body) => {
  try {
    const contacts = await getListContacts();
    const idx = contacts.find((item) => item.id === Number(contactId));
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { ...contacts[idx], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateContact;