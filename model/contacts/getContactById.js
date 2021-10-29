const contactsData = require("./contactsData");

const getContactById = async (contactId) => {
  const contacts = await contactsData();
  const [result] = contacts.filter(
    (contact) => String(contact.id) === contactId
  );
  return result;
};

module.exports = getContactById;
