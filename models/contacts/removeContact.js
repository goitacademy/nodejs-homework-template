const fs = require("fs/promises");
const readData = require("./readData");
const contactsPath = require("./contactsPath");

const removeContact = async (contactId) => {
  const contacts = await readData();
  const deleteContact = contacts.filter(
    (contact) => String(contact.id) !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(deleteContact, null, 2));
  const [result] = contacts.filter(
    (contact) => String(contact.id) === contactId
  );
  return result;
};

module.exports = removeContact;
