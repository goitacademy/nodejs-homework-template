const Contact = require("../../models/contactsModel");
const RequestError = require("../../helpers/RequestError");

const schema = require("../../schemas/schemas");

const updateFavoriteField = async (req, res, next) => {
  const updatedInfo = req.body;
  const id = req.params.contactId;
  const { error } = schema.favoriteContact.validate(updatedInfo);
  if (error) {
    throw RequestError(404, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(id, updatedInfo, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = updateFavoriteField;
