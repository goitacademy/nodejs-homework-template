const addContact = require('../model/addContact');

const postContact = async (req, res, next) => {
  const data = await addContact(req.body);
  res.status(201).json(data);
};

module.exports = postContact;
