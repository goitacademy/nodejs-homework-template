const fs = require("fs/promises");
const filePath = require("./filePath");
const listContacts = require("./getAll");

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const [updatableContact] = contacts.filter(
    (contact) => contact.id === contactId
  );
  if (updatableContact) {
    Object.assign(updatableContact, body);
    await fs.writeFile(filePath, JSON.stringify(contacts));
  }
  return updatableContact;
};

module.exports = updateContact;
