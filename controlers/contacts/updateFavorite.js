const { Contact } = require("../../models");
const { HttpError } = require("../../utils");

const updateFavorite = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = updateFavorite;
