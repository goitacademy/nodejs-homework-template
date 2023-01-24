const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const updateById = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = updateById;
