const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  // const result = await Contact.findById(contactId);
  const result = await Contact.find({ _id: contactId, owner }).populate(
    "owner",
    "email subscribtion"
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = ctrlWrapper(getById);
