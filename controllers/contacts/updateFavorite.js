const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateFavorite;
