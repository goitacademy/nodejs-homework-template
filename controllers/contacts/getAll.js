const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: _id }, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id email ');

  res.json(result);
};

module.exports = getAll;
