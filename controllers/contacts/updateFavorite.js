const { Contact } = require("../../models/contact");
const { HttpError} = require("../../utils/index");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found user with this ID!");
  }
  res.json(result);
};

module.exports = updateFavorite;