const listContacts = require("./listContacts");
const updataData = require("./updateData");

const removeContact = async (id) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === id.toString());
  if (idx === -1) {
    return null;
  }
  const fiteredProducts = contacts.filter((_, index) => index !== idx);

  await updataData(fiteredProducts);

  return contacts[idx];
};

module.exports = removeContact;
