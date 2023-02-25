const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

const getAllContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(result);
  } catch (err) {
    return console.log(err.message);
  }
};

module.exports = getAllContacts;
