const Contact = require("../../models/contacts.js");
const { requestError } = require("../../utils");

const removeContact = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json({
    message: "Contact deleted",
  });
};

module.exports = removeContact;
