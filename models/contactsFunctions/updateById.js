const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const idx = await contacts.findIndex(
    (contact) => contact.id === id.toString()
  );
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...data };

  await updateContacts(contacts);

  return contacts[idx];
};

module.exports = updateById;
