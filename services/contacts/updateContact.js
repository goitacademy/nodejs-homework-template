const Contact = require("../../models/contacts");

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const result = await Contact.findOneAndUpdate(contactId, {
    name,
    email,
    phone,
  });

  return result;
};

module.exports = updateContact;
