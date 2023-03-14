const { Contact } = require("../../models");
const removeContact = async (contactId, owner) => {
  const data = await Contact.findOneAndDelete({ _id: contactId, owner });
  return data;
};
module.exports = removeContact;
