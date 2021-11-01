const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => String(item.id) === contactId);
  if (idx === -1) {
    return null;
  }
  //console.log("contacts[idx]:", contacts[idx]);
  return contacts[idx];
};

module.exports = getContactById;
