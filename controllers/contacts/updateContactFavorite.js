const { updateStatusContact } = require("../../models/contacts/index");
const HttpError = require("../../helpers/HttpError");

const updateContactFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  const updatedContact = await updateStatusContact(contactId, { favorite });

  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = updateContactFavorite;
