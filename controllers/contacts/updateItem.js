const Contact = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");

const schema = require("../../schemas/schemas");

const updateItem = async (req, res, next) => {
  const updatedContact = req.body;
  const id = req.params.contactId;
  const { error } = schema.updateContact.validate(updatedContact);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await Contact.findByIdAndUpdate(id, updatedContact, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = updateItem;
