const { Contact } = require('../../models/contact');

const listContacts = async (req, res) => {
  const result = await Contact.find({}, 'name phone');
  res.json(result);
};

module.exports = listContacts;
