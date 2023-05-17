/** @format */

const { Contact } = require("../../models/contact");
const RequestError = require("../../helpers/requestError");
const { updateFavoriteSchema } = require("../../models/contact");

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      throw RequestError(400, `missing field favorite`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
