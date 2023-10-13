const Contact = require('../../models/contact');

const add = async (req, res) => {
  res.status(201).json(await Contact.create(req.body));
};

module.exports = add;
