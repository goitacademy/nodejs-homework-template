const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updateFavorite = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, updateFavorite, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.json(result);
};

module.exports = updateStatusContact;
