const { HttpError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) throw HttpError(404, 'Not found');

  res.status(200).json({ message: 'contact deleted' });
};

module.exports = removeById;
