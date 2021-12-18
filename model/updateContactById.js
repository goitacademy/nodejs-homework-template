const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const updateContactById = async ({ id, name, email, phone }) => {
  console.log(id, name, email, phone);
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  console.log(idx);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateContactById;
