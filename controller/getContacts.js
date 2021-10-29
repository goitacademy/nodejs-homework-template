const {Contact} = require('../model/contactSchema');

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find();

  res.status(200).json({message: 'success', data: {contacts}});
};

module.exports = getContacts;
