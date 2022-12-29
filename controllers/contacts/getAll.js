const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const contactsList = await Contact.find();
  res.status(200).json(contactsList);
};

module.exports = getAll;
