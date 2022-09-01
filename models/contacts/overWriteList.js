const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

const overWriteList = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

module.exports = overWriteList;
