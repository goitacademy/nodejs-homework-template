const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const updatedContactById = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    { new: true }
  );
  if (!updatedContactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContactById);
};

module.exports = updateContact;
