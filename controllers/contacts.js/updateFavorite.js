const { Contact } = require('../../models');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updateContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!updateContact) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.json(updateContact);
};

module.exports = updateFavorite;
