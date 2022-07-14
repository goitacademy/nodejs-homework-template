const { createError } = require("../../helpers");

const { Contact } = require("../../models/contacts");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;
