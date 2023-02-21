const { Contact } = require('../../models/index');
const { HttpSuccess } = require('../../helpers');

const getContacts = async (req, res) => {
  const data = await Contact.find({});
  return res.json(HttpSuccess({ data }));
};
module.exports = getContacts;
