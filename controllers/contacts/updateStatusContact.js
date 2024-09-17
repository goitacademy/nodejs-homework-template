const { Contact } = require("../../models");
const { httpError } = require("../../helpers");
const { schemas } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw httpError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404);
  }
  res.json(result);
};

module.exports = ctrlWrapper(updateStatusContact);
