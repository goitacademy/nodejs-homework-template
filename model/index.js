 const fs = require('fs/promises')
 const path = require("path");
 const contactsPath = path.join(__dirname, "./contacts.json");

 async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
}

const listContacts = async () => {
 
  const contacts = await readContacts();
  console.log("List of contacts: ");
  console.table(contacts);

  return contacts;
};

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
