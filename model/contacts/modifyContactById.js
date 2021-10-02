const getContacts = require("./getContacts");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function modifyContactById(contactId, newData) {
  const contacts = await getContacts();
  if (!contacts.find((contact) => contact.id === Number(contactId))) {
    return -1;
  }
  const updatedContacts = contacts.map((contact) =>
    contact.id === Number(contactId) ? { ...contact, ...newData } : contact
  );

  try {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return updatedContacts.find((contact) => contact.id === Number(contactId));
  } catch (error) {
    return null;
  }
}

module.exports = modifyContactById;
