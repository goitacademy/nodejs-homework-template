const {Contact} = require('../../models/contact')

const getListContacts = async (req, res, next) => {
  const result = await Contact.find({});
  res.json(result);
}

module.exports = getListContacts

