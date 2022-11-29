const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers/HttpError");

const updateFavoriteSchema = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateFavoriteSchema;
