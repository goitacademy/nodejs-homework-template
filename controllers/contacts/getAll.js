const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20,favorit } = req.query;
  const skip = (page - 1) * limit;
  if (favorit) {
    const result = await Contact.find({ owner,favorit}, '-createdAt -updatedAt', {
      skip,
      limit: Number(limit),
    }).populate('owner', 'name email');
    res.json(result);
    return
  }
  const result = await Contact.find({ owner}, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'name email');
  res.json(result);
};

module.exports = getAll;
