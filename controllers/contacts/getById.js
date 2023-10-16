const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data: contact });
};

module.exports = ctrlWrapper(getById);
