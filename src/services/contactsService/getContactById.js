const { Contact } = require("../../db");

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};
module.exports = {
  getContactById,
};
