const { Contact } = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = ctrlWrapper(listContacts);