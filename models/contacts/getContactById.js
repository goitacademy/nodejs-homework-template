const listContacts = require("./listContacts");

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id.toString());
  return result;
};

module.exports = getContactById;
