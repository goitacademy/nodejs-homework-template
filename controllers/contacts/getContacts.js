const { Contact } = require('../../models/contact-schema');

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  console.log('contacts:', contacts);
  res.status(200).json(contacts);
}

module.exports = getContacts;
