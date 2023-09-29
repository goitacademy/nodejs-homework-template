const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.find({ owner }, "-createdAt -updatedAt");

  res.status(200).json(result);
};

module.exports = getAll;
