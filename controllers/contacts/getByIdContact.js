const contactSchema = require("../../models/contactSchema");
const { HttpError, ctrlWrapper } = require("../../helpers/index");
const getByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactSchema.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = { getByIdContact: ctrlWrapper(getByIdContact) };
