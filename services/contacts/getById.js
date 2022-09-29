const { ContactModel } = require("../../models/contact");

const getById = async (contactId, userId) => {
  const data = await ContactModel.findById(contactId, { owner: userId });
  return data;
};

module.exports = getById;
