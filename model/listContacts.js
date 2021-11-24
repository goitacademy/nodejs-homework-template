const fs = require("fs/promises");

const filePathContacts = require("./db/filePath.js");

const listContacts = async () => {
  const data = await fs.readFile(filePathContacts, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = listContacts;
