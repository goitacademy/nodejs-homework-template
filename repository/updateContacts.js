const Contact = require("../models/contacts");

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );

  console.log(contactId);

  return result;
};

module.exports = { updateContact };
