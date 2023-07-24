const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

module.exports = deleteContact;
