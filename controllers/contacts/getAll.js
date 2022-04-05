const {Contact} = require('../../models');

const getAll = async (req, res) => {
  const contacts = await Contact.find({});
  return res.json({status: 'success', code: 200, data: contacts});
};

module.exports = getAll;
