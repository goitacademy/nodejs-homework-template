const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: id });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, 'Not found');
  }
  res.json(result);
};

module.exports = getContactById;
