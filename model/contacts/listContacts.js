const fs = require("fs/promises");
const { join } = require("path");
const contactsPath = join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contactList = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contactList);
  } catch (err) {
    return err.message;
  }
};

module.exports = listContacts;
