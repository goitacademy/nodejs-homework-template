const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const result = await Contact.find({ owner: _id }, '-createdAt -updatedAt', {
      skip,
      limit: Number(limit),
    }).populate('owner', 'email');
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;