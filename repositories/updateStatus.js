const Contact = require("../model/contact");

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = updateStatusContact;
