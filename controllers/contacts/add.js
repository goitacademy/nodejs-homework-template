const { Contact } = require('../../models/contact');

const add = async (req, res, next) => {
  const data = req.body;
  const result = await Contact.create(data);
  res.status(201).json(result);
};

module.exports = add;
