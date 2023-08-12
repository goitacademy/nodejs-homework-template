const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, `${req.params.contactId} not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
