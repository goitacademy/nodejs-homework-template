const fs = require("fs/promises");
const contactsPaath = require("../contactsPaath");
const listContacts = require("./listContacts");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [contact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPaath, JSON.stringify(contacts));
  return contact;
};

module.exports = removeContact;
