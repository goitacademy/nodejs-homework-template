const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, favorite, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  if (!favorite) {
    throw HttpError(400, "missing field favorite");
  }
  res.json(result);
};

module.exports = {
  updateFavorite: ctrlWrapper(updateFavorite),
};
