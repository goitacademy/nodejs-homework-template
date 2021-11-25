const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("");

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(
      `${contactsPath}/model/contacts.json`,
      "utf8"
    );
    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (contact) => contact.id === parseInt(contactId)
    );
    console.table(contact);
    return contact;
  } catch (error) {
    throw error;
  }
}

module.exports = getContactById;
