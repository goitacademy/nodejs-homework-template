const listContacts = require("./listContacts");

const updateContact = require("./updateContact");


const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts.splice(idx, 1);
  await updateContact(contacts);
  return "Success remove";
};

module.exports = removeContact;
