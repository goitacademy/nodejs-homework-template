const { Contact } = require("../models/index.js");
const { HttpError, ctrlWrapper } = require("../helpers/index.js");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  updateContact: ctrlWrapper(updateContact),
};
