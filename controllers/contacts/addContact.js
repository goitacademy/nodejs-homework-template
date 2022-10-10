const { Contact } = require('../../models/contact');

const addNewContacts = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = addNewContacts;
