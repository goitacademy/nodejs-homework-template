const { Contact } = require('../../models');

const updateContactByFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const update = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    if (!update) {
      return res.status(404).json({
        message: "missing field favorite",
      });
    }
    res.json({
      update,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactByFavorite;

