const Contact = require('../../models/contact');

const getAll = async (req, res) => {
  res.json(await Contact.find());
};

module.exports = getAll;
