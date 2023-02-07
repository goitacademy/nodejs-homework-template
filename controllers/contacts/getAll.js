const contactModel = require('../../models/contact');

const getAll = async (req, res) => {
  const result = await contactModel.find({}, '-createdAt -updatedAt');

  res.json(result);
};

module.exports = getAll;
