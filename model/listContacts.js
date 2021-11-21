const fs = require("fs/promises");

const filePathContacts = require("./filePath.js");

const listContacts = async () => {
  const data = await fs.readFile(filePathContacts, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = listContacts;
