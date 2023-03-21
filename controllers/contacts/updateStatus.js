const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const updateStatus = async (req, res) => {
  const hasPropertyFavorite = Object.prototype.hasOwnProperty.call(
    req.body,
    "favorite"
  );
  if (!hasPropertyFavorite) {
    throw createError(400, "missing field favorite");
  }

  const { id } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw createError(404, "not found");
  }

  res.status(200).json({ contact: result });
};

module.exports = updateStatus;
