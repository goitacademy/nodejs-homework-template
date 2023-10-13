const Contact = require('../../models/contact');
const { HttpError } = require('../../helpers');

const updateFavorite = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.json(contact);
};

module.exports = updateFavorite;
