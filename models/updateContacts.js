const fs = require("fs/promises");
const contactPath = require("./contactsPath");

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateContacts;
