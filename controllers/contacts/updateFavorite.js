const { Contact, schemas } = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};
module.exports = updateFavorite;
