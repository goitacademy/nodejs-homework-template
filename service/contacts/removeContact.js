const { Contacts } = require("../../db/contacts");
const removeContact = async (contactId) => {
  const data = await Contacts.findByIdAndDelete({ _id: contactId });
  return data;
};
module.exports = removeContact;
