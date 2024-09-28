const { Contact } = require('../../models/contact');

const { HttpError } = require('../../helpers');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
};

module.exports = updateFavorite;
