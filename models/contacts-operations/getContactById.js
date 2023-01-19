const getContacts = require("./getContacts");

const getContactById = async (contactId) => {
  const res = await getContacts();
  const [result] = res.filter((contact) => contact.id === contactId);
  return result;
};

module.exports = getContactById;
