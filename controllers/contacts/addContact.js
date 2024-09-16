const contactSchema = require("../../models/contactSchema");
const { HttpError, ctrlWrapper } = require("../../helpers/index");
const { addShema } = require("../../JoiShems/index");
const addContact = async (req, res) => {
  const { error } = addShema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const result = await contactSchema.create(req.body);
  res.status(201).json(result);
};

module.exports = { addContact: ctrlWrapper(addContact) };
