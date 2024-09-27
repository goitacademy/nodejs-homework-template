const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  // const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = ctrlWrapper(getContactById);
