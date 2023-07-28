const Contacts = require("../../models/contact");
const { HttpError } = require("../../helpers");

const updateByFavorite = async (req, res) => {
  const id = req.params.id;

  const result = await Contacts.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
module.exports = updateByFavorite;
