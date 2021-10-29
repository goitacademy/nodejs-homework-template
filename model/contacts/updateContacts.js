const fs = require("fs/promises");

const productsPath = require("./contactsPath");

const updateContacts = async (newContacts) => {
  const contactStr = JSON.stringify(newContacts);
  await fs.writeFile(productsPath, contactStr);
};

module.exports = updateContacts;
