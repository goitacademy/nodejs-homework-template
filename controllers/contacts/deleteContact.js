const { removeContact } = require("../../models/contacts/index");
const HttpError = require("../../helpers/HttpError");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (result) {
    res.json({ message: "Contact deleted" });
  } else {
    next(new HttpError(404, "Not Found"));
  }
};

module.exports = deleteContact;
