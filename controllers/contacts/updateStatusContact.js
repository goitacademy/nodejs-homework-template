const { createError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  // const { error } = schemas.updateFavoriteSchema.validate(req.body);
  // if (error) {
  //   throw createError(400, (error.message = "missing field favorite"));
  // }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateStatusContact;
