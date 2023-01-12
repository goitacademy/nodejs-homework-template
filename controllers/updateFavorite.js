const { Contact } = require("../models/contact");

const HttpError = require("../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  // eslint-disable-next-line no-prototype-builtins
  if (!res.body.hasOwnProperty("favorite")) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateFavorite;
