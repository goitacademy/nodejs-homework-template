const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("");

async function listContacts() {
  try {
    const data = await fs.readFile(
      `${contactsPath}/model/contacts.json`,
      "utf8"
    );
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}
module.exports = listContacts;
