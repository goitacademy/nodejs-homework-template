const { Contact } = require("../../models");
const { contactSchemas } = require("../../schemas");
const HttpError = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { error } = contactSchemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateFavorite;
