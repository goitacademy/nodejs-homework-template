const { updateStatusContact } = require("../../models/contacts/index");
const HttpError = require("../../helpers/HttpError");

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined && Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingContact = await updateStatusContact(contactId, { favorite });

    if (existingContact) {
      const updatedContact = await updateStatusContact(contactId, {
        favorite: !existingContact.favorite,
      });
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
};

module.exports = updateContactStatus;
