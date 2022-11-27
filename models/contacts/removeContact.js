const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const fs = require("fs").promises;
const path = require("path");
const contactPath = path.resolve("./models/contacts.json");

const removeContact = async (id) => {
  const contactForDell = await getContactById(id);
  if (contactForDell) {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactForDell.id
    );
    await fs.writeFile(contactPath, JSON.stringify(filteredContacts));
    return contactForDell;
  } else {
    return null;
  }
};

module.exports = removeContact;
