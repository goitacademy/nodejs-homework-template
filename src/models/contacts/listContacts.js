const fs = require("fs/promises");
const contactsPaath = require("../contactsPaath");

const listContacts = async () => {
  const data = await fs.readFile(contactsPaath);
  const contacts = JSON.parse(data);
  return contacts;
};

module.exports = listContacts;
