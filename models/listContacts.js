const fs = require("fs/promises");
const db = require("./filePath");

const listContacts = async () => {
  try {
    const data = await fs.readFile(db.filePath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("there was an error:", error.message);
    throw new Error(`there was an error: ${error.message}`);
  }
};

module.exports = listContacts;
