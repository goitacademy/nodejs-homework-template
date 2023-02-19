const fs = require("fs").promises;
const path = require("path");
const listContacts = require('./listContacts');

const contactsPath = path.join(__dirname, '..', 'db', "contacts.json");

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const contactToUpdateIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactToUpdateIndex < 0) {
    return null;
  }

  const contactToUpdate = contacts[contactToUpdateIndex];
  contacts[contactToUpdateIndex] = { ...contactToUpdate, ...body };

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, "\t"),
    "utf8"
  );

  return contacts[contactToUpdateIndex];
};


module.exports = updateContact;
