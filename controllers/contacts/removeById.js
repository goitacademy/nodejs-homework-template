const { RequestError } = require("../../helpers");
const contacts = require("../../models/contacts");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = removeById;
