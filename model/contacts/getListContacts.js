const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

const getListContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getListContacts;