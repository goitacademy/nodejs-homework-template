const { Contact } = require("../../models");
const addContact = async (body, owner) => {
  const data = await Contact.create({ ...body, owner });
  return data;
};
module.exports = addContact;
