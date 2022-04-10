const Contact = require("../models/contacts");

async function getContactById(contactId) {
  const result = await Contact.findOne({ _id: contactId });
  return result;
}

module.exports = {
  getContactById,
};
