const { Contact } = require('../../models/index');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "", {skip, limit}).populate('owner', 'email subscription');
  res.status(200).json(result);
};

module.exports = getAll;