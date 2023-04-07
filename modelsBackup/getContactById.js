const listContacts = require("./listContacts");

const getContactById = async (id) => {
  const contacts = await listContacts();
  console.log(id);
  const result = contacts.find((item) => item.id === id.toString());

  if (!result) {
    return null;
  }
  return result;
};

module.exports = getContactById;
