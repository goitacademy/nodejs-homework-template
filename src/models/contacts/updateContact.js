const fs = require("fs/promises");
const listContacts = require("./listContacts");
const contactsPaath = require("../contactsPaath");

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPaath, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = updateContact;
