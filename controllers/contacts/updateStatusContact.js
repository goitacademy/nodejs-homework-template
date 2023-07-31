const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, 'Missing field favorite');
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = {
  updateStatusContact,
};
