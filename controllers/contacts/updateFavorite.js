const { Contact } = require('../../models/contact');

const updateFavorite = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { favorite },
      { new: true },
    );
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.json({
      updateContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
