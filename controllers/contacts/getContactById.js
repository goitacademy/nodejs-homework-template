const { Contact } = require("../../models");
const { HttpError, ctrlBox } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-createdAt -updatedAt");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = ctrlBox(getContactById);
