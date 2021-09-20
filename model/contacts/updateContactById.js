const getAllContacts = require("./getAllContacts");
const updateContacts = require("./updateContacts");

const updateContactsById = async (id, body) => {
  const contacts = await getAllContacts();
  const [result] = contacts.filter((contact) => contact.id === id);
  if (result) {
    Object.assign(result, body);
    updateContacts(contacts);
  }
  return result;
};

module.exports = updateContactsById;
