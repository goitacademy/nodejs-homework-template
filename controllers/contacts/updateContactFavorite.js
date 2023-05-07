const { HttpError, ctrlWrapper } = require("../../helpers/index");
const contactSchema = require("../../models/contactSchema");
const {addShemaFavorite} = require('../../JoiShems/index')
const updateContactFavorite = async (req, res) => {
  const { error } = addShemaFavorite.validate(req.body);
  if (error) {
    throw HttpError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await contactSchema.findByIdAndUpdate(contactId, req.body, {
    new: true,
    select: "-updatedAt -createdAt",
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {updateContactFavorite: ctrlWrapper(updateContactFavorite)}