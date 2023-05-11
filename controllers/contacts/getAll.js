const { Contact } = require("../../models/contacts.js");

const getAll = async (req, res) => {
  const result = await Contact.find({});
  return res.json(result);
};

module.exports = getAll;
