const { HttpError } = require("../../helpers");

const { Contact } = require("../../models/contact");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);

  if (!deletedContact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.status(200).json({
    message: "Delete success",
  });
};

module.exports = deleteContact;
