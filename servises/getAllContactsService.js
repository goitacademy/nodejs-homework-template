const { Contact } = require("../db/contactModel");

const getAllContactsService = async (owner) => {
  const data = await Contact.find({ owner });
  return data;
};
module.exports = { getAllContactsService };
