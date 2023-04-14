const { Contact } = require("../models/contact");
const httpError = require("../helpers/httpError");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.removeContact(contactId);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
