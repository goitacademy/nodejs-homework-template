const updateContacts = require("./updateContacts");
const listContacts = require("./listContacts");

const updateById = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  console.log(id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateById;
