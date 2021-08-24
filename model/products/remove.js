const fs = require("fs/promises");
const filePath = require("./filePath");
const listContacts = require("./getAll");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const removeContact = contacts.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(contacts));
    return removeContact;
  }
  return null;
};

module.exports = removeContact;
