const { HttpError } = require("../helpers");
const { Contact } = require("../models/contact");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = removeContact;
