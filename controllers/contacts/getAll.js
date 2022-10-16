const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = true } = req.query;
  const skip = (page - 1) * 10;
  const result = await Contact.find({ owner, favorite }, '-createdAt -updatedAt', { skip, limit }).populate('owner', 'email subscription');
  res.status(200).json(result);
};

module.exports = getAll;
