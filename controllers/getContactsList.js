const { Contact } = require('../models/contacts');

const getContactsList = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

module.exports = { getContactsList };
