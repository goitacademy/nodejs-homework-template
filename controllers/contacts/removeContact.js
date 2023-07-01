const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
