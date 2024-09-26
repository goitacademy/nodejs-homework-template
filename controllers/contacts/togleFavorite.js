const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const editContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!editContact) {
    throw HttpError(404, "Not found");
  }
  res.json(editContact);
};

module.exports = updateFavorite;
