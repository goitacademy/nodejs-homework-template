const { Contact } = require('../../models/contact');

// If you want to return some exact fields - use:
// Contact.find({}, "name email")
// If you don't want to return some field - use:
// Contact.find({}, '-name -email');

const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.json(allContacts);
};

module.exports = getAllContacts;
