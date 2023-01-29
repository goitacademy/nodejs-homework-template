const { Contact } = require("../../models/modelContact");

const updateContactStatus = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: body },
    { new: true }
  );

  return contact;
};

module.exports = {
  updateContactStatus,
};
