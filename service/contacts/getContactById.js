const { Contact } = require("../../models");
const getContactById = async (contactId, owner) => {
  const data = await Contact.findOne({ _id: contactId, owner });

  return data;
};
module.exports = getContactById;
