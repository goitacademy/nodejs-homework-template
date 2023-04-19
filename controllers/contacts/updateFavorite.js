const { Contact } = require("../../models/contact");

const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "missing field favorite");
  }
  res.status(200).json(result);
};

module.exports = updateFavorite;
