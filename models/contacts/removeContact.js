const DB = require("../../db/db.js");
const db = new DB("contacts.json");

const removeContact = async (contactId) => {
  const contacts = await db.read();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1);
    await db.write(contacts);
    return contact;
  }
  return null;
};

module.exports = removeContact;
