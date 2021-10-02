const getContacts = require("./getContacts");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

console.log(__dirname);
async function addContact(data) {
  const contacts = await getContacts();
  const newID = contacts[contacts.length - 1].id + 1;

  const contactToAdd = {
    id: newID,
    name: data.name,
    email: data.email,
    phone: data.phone,
  };
  contacts.push(contactToAdd);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contactToAdd;
  } catch (error) {
    return null;
  }
}

module.exports = addContact;
