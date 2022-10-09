const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

module.exports = deleteById;
