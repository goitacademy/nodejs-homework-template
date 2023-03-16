const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, "contact not found");
  }
  res.status(200).json(result);
};

module.exports = {
  updateById: ctrlWrapper(updateById),
};
