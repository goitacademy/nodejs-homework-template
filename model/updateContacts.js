const fs = require("fs/promises");
const contactsPath = require("../utils/contactsPath");

const updateContacts = async (newContact) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContact));
};

module.exports = updateContacts;
