const contacts = require("../../services/contacts");
const { HttpError } = require("../../helpers/contacts");

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

module.exports = remove;
