const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();

  res.json(result);
};

module.exports = getAllContacts;