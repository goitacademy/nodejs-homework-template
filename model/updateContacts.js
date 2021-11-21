const fs = require("fs/promises");

const filePathContacts = require("./filePath.js");

const updateContacts = async (contacts) => {
  await fs.writeFile(filePathContacts, JSON.stringify(contacts));
};

module.exports = updateContacts;
