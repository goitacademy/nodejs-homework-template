const { updateFavoriteSchema } = require("../../schemas");
const { HttpError } = require("../../helpers");
const asyncHandler = require("express-async-handler");
const { ContactServices } = require("../../services");

const setFavorite = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await ContactServices.setFavorite(contactId, req.body);
  if (!result) {
    throw HttpError(404, `not found`);
  }
  res.json({ status: 200, message: "Success", data: result });
});

module.exports = setFavorite;
