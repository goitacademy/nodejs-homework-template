const { Contact } = require("../../models/contact");

const getContacts = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getContacts;
