const { Contact } = require('../../models');

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!contact) {
    const error = new Error(`Contact with Id=${contactId} not found`);
    error.status = 404;
    throw error;
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'favorite updated',
    data: {
      contact,
    },
  });
};

module.exports = updateFavorite;
