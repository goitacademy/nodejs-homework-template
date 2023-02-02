const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

module.exports = getAll;
