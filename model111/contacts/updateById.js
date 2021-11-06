const contactsData = require("./contactsData");
const updateContacts = require("./updateContacts");

const updateById = async (id, data) => {
  const contacts = await contactsData();
  const idx = contacts.findIndex((contact) => String(contact.id) === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateById;
