const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

const updateData = async (newContact) => {
  const contactToString = JSON.stringify(newContact);
  await fs.writeFile(contactsPath, contactToString);
};
module.exports = updateData;
