const getError = require("../../helpers/error");
const { Contact } = require("../../models/contacts");

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      throw getError(404);
    }
    res.json(updatedContact);
  } catch (err) {
    next(err);
  }
};

module.exports = updateFavorite;
