const getAll = require("./listContacts");

const getContactById = async (id) => {
  const contacts = await getAll();
  const contact = contacts.find((item) => item.id === Number(id));
  if (!contact) {
    return null;
  }
  return contact;
};

module.exports = getContactById;
