const { HttpError, ctrlWrapper } = require("../../helpers");

const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById({ _id: contactId });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = { getById: ctrlWrapper(getById) };