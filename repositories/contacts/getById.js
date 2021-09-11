const Contact = require("../../model/contact");

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "email subscription",
  });
  return result;
};

module.exports = getContactById;
