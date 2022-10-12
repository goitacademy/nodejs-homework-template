const RequestError = require("../../helpers");
const { Contact } = require("../../models/contacts");
const { updateFavorite } = require("../../models/contacts");

const updateStatusContact = async (req, res) => {
  const { error } = updateFavorite.required(req.body);
  if (error) {
    throw RequestError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateStatusContact;
