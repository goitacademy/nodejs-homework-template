const Contact = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');

const getAll = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = { getAll: ctrlWrapper(getAll) };
