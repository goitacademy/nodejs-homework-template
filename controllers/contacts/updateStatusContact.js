const { Contact, schemas } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { error } = schemas.updateStatusSchema.validate(req.body);
  if (error) {
    console.log(error);
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateStatusContact;
