const { Contact } = require("../../db");

const getContactById = async (id, userId) => {
  const contact = await Contact.findOne({ _id: id, owner: userId });
  return contact;
};
module.exports = {
  getContactById,
};
