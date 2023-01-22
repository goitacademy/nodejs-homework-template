const { Contacts } = require("../../db/contactsModel");
const { HttpError } = require("../../helpers/index");

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const result = await Contacts.findById(contactId);
  if (!result) {
    return next(HttpError(404, "Contact not found"));
  }
  res.json({
    message: "contact found",
    contact: result,
  });
}
module.exports = {
  getContact,
};
