const { Contact } = require('../../models/contact');

const add = async (req, res, next) => {
  const newContact = { ...req.body };

  const result = await Contact.create(newContact);

  res.status(201).json(result);
};

module.exports = add;
