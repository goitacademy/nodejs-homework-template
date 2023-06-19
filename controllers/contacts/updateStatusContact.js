const { HttpError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const updateStatusContact = async (req, res, next) => {
  const contactBody = req.body;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, contactBody, {
    new: true,
  });

  if (!result) throw HttpError(404, 'Not found');
  if (!contactBody.favorite) throw HttpError(400, 'missing field favorite');

  res.status(201).json(result);
};

module.exports = updateStatusContact;
