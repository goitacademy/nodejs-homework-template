const { Contact } = require('../../models/contact');

const updateFavoriteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json(result);
};

module.exports = updateFavoriteContact;
