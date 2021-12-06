const listContacts = require("./listContacts");
const updateContact = require("./updateContact");

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  // const [removeContact] = contacts.splice(idx, 1);
  // await updateContact(contacts);
  // return removeContact
  const newContact = contacts.filter((_, index) => index !== idx);
  await updateContact(newContact);
  return contacts[idx];
};

module.exports = removeContact;
