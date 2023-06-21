const { Contact } = require("../../models/contacts/contacts");

const { HttpError} = require("../../Helpers");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  removeContact,
};
