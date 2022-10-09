const { Contact } = require("../../models/contactModel");

const getAll = async (req, res) => {
  const data = await Contact.find();
  res.status(200).json(data);
};

module.exports = getAll;
