const { Contact } = require("../../models/contact/contact");

const { HttpError } = require("../../Helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  updateFavorite,
};
