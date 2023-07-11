const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id = ${contactId} not found`);
  }
  res.json({ message: "contact deleted", contactId });
};

module.exports = deleteContact;
