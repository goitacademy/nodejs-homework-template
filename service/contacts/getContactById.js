const { Contacts } = require("../../db/contacts");
const getContactById = async (contactId) => {
  const data = await Contacts.findById({ _id: contactId });
  return data;
};
module.exports = getContactById;
