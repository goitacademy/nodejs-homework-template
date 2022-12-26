const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Contact deleted" });
};

module.exports = removeById;
