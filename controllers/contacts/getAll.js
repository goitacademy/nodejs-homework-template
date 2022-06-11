const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const { _id } = req.user;
    const contacts = await Contact.find({ owner: _id }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', '_id email subscription');
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
