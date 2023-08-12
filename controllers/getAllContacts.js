const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};
module.exports = getAll;
