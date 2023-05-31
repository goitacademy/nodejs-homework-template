const { HttpError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const deleteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.status(200).json({
    message: 'contact deleted',
  });
};

module.exports = deleteById;
