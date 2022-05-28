const { Contact } = require("../../model");

const getById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "id subscription email",
  });
  return result;
};
module.exports = getById;
