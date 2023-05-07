const { HttpError, ctrlWrapper } = require("../../helpers/index");
const contactSchema = require("../../models/contactSchema");
const {addShema} = require('../../JoiShems/index')
const updateContact = async (req, res) => {
  const { error } = addShema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await contactSchema.findByIdAndUpdate(contactId, req.body, {
    new: true,
    select: "-updatedAt -createdAt",
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {updateContact: ctrlWrapper(updateContact)}