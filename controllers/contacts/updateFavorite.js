const { Contact } = require("../../models");
const { createError } = require("../../helpers");
const { validateSchema } = require("../../models");

const updateFavorite = async (req, res) => {
  const { error } = validateSchema.validate(req.body);
  if (error) {
    throw createError(400, "missing fields favorite");
  }
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, { favorite });
  if (!result) {
    throw createError(404);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateFavorite;
