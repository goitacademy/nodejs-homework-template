const DB = require("../../db/db.js");
const db = new DB("contacts.json");

const getContactById = async (contactId) => {
  const contacts = await db.read();
  const [contact] = contacts.filter((item) => item.id === contactId);
  return contact;
};

module.exports = getContactById;
