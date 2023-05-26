const Contact = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, '-createdAt -updatedAt');
  res.json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
