const { HttpError } = require("../../helpers");
const contacts = require("../../models/contacts");

const deleteById = async (req, res) => {
  const result = await contacts.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = deleteById;
