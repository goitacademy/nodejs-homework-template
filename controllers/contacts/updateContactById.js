const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = ctrlWrapper(updateContactById);
