const { updateFavoriteSchema } = require("../../schemas");
const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const setFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing field favorite");
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      throw HttpError(404, `not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = setFavorite;
