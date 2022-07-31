const Contact = require("../models/contacts");

async function getContactById(contactId, user) {
  const result = await Contact.findOne({
    _id: contactId,
    owner: user.id,
  }).populate({
    path: "owner",
    select: "name email role createdAt updatedAt",
  });
  return result;
}

module.exports = {
  getContactById,
};
