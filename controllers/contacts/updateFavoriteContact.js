const { Contact } = require("../../models/contact");

const { HttpError, ctrlWrapper } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  if (!body) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(id, body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  updateFavorite: ctrlWrapper(updateFavorite),
};
