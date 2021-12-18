const fs = require("fs/promises");

const contactsPath = require("./contactsPath");

const updateContacts = async (products) => {
  await fs.writeFile(contactsPath, JSON.stringify(products, null, 2));
};

module.exports = updateContacts;
