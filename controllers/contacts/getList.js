const { Contact } = require('../../models/contact');

const getList = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;
  const list = await Contact.find({ owner }, '-createdAt -updatedAt', { skip, limit });
  res.json(list);
};

module.exports = getList;
