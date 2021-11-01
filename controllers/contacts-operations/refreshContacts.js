const fs = require("fs/promises");
const { contactsPath } = require("../../model");

const refreshContacts = async (contactsToFile) => {
  const newContacts = await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsToFile)
  );
  return newContacts;
};

module.exports = refreshContacts;
