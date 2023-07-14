const { Contact } = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const {_id: owner } = req.user;
  const result = await Contact.find({owner}).populate('owner', "email");

  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
