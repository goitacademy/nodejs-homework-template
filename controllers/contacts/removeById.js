const contactOperations = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactOperations.removeContact(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

module.exports = removeById;
