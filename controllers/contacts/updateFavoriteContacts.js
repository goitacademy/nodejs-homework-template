const { Contact } = require("../../models/Contact");
const { createError } = require("../../helpers");

const updateFavoriteContacts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const owner = req.user._id;
    const result = await Contact.findOneAndUpdate(
      { _id: id, owner },
      { $set: { favorite } },
      { new: true }
    );
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavoriteContacts;
