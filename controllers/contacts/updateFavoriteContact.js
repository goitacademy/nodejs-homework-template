const { createError, favoriteContactJoiSchema } = require("../../helpers");
const { Contact } = require("../../models/contactSchema");

const updateFavoriteContact = async (req, res, next) => {
  try {
    const { error } = favoriteContactJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "JoiError. Missing required field");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavoriteContact;
