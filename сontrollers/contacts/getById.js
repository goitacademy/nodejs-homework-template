const { HttpError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

module.exports = getById;
