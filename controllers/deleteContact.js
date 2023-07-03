const Contact = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const deleteContact = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
});

module.exports = deleteContact;
