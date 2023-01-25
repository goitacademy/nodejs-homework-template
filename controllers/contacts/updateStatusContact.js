const { httpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;
  const contactToUpdate = await Contact.findById(contactId);
  if (!contactToUpdate) {
    return next(httpError(404, "Not found"));
  }
  const updatedContactFavoriteField = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: req.body.favorite },
    {
      new: true,
    }
  );
  return res.status(200).json(updatedContactFavoriteField);
}

module.exports = {
  updateStatusContact,
};
