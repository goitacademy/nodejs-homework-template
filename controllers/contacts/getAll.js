const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const result = await Contact.find({ owner: _id });
  res.json(result);
};

module.exports = getAll;
