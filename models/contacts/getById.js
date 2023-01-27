const getAll = require("./getAll");

const getById = async (contactId) => {
  const contactList = await getAll();
  const contact = contactList.find(({ id }) => id === contactId);

  if (!contact) {
    return null;
  }
  
  return contact;
};

module.exports = getById;
