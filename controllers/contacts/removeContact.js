const { Contact } = require("../../models/contact");
const HttpError = require("../../helpers/HttpError");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
