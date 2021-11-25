const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("");

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(
      `${contactsPath}/model/contacts.json`,
      "utf8"
    );
    const contacts = JSON.parse(data);
    const contact = contacts.filter(
      (contact) => contact.id !== parseInt(contactId)
    );
    await fs.writeFile(
      `${contactsPath}/model/contacts.json`,
      JSON.stringify(contact)
    );
    console.table(contact);
    return contact;
  } catch (error) {
    throw error;
  }
}

module.exports = removeContact;
