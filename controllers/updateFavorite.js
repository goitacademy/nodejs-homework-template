const { Contact } = require("../models/contact");
const { RequestError } = require("../helpers");

const updateFavorite = async (req, res) => {
  const body = req.body;
  if (!body) {
    throw RequestError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateFavorite;
