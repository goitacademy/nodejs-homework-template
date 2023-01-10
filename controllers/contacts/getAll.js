const { Contacts } = require("../../models");

const getAll = async (req, res) => {
  const contacts = await Contacts.find({});
  res.json(contacts);
};

module.exports = getAll;
