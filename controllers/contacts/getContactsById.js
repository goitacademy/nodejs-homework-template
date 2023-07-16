const {
  contactsModel: { Contact },
} = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

module.exports = { getContactsById: ctrlWrapper(getContactsById) };
