const updateContact = require("./updateContact");
const listContacts = require("./listContacts");

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const updateProducts = { ...contacts[idx], ...data };
  contacts[idx] = updateProducts;
  await updateContact(contacts);
  return updateProducts;
};

module.exports = updateContactById;
