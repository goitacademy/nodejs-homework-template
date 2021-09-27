const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

const getListContacts = require("./getListContacts");

const removeContact = async (contactId) => {
  try {
    const contacts = await getListContacts();

    const filteredContacts = await contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = removeContact;