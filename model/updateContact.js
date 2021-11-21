const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (item) => item.id.toString() === id.toString()
  );
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateContact;
