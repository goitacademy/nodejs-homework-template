const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updateAt");
  res.json(result);
};

module.exports = listContacts;
