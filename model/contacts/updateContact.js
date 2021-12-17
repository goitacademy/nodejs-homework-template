const fs = require("fs/promises");
const readContent = require("./readContent");
const contactsPath = require("./contactsPath");

const updateContact = async (id, data) => {
  const contacts = await readContent();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return contacts[index];
};

module.exports = updateContact;
