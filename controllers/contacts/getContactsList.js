const { Contact } = require('../../models/contact');

const getContactsList = async (_, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt');
  res.json(result);
};

module.exports = getContactsList;
