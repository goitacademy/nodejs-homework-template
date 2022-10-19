const { Contact } = require("../../models/Contact");
const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};
module.exports = updateFavorite;
