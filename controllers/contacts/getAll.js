const { Contact } = require('../../models/contact');

// TODO add filter query and total count

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, '', { skip, limit }).populate(
    'owner',
    'email subscription -_id'
  );
  res.json({ ...result, page, limit });
};

module.exports = getAll;
