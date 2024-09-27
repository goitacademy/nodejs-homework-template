const { removeContact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
//
const removeById = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json({
    message: "Contact Deleted",
  });
};
module.exports = removeById;
