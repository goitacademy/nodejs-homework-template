const { Contact } = require('../../models/contact');

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt');

  res.json(result);
};

module.exports = getAllContacts;
