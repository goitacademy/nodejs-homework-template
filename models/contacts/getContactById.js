const getContactsList = require("./getContactsList");

const getContactById = async (contactId) => {
  const contactList = await getContactsList();
  const contact = contactList.find(({ id }) => id === contactId);

  if (!contact) {
    return null;
  }
  
  return contact;
};

module.exports = getContactById;
