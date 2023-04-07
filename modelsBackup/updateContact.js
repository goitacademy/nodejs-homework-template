const listContacts = require("./listContacts");
const updateData = require("./updateData");

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }

  contacts[idx] = {
    id,
    name,
    email,
    phone,
  };

  await updateData(contacts);

  return contacts[idx];
};

module.exports = updateContact;
