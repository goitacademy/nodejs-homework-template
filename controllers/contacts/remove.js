const { RequestError } = require("../../utils/requestError");
const { removeContact } = require("../../models/contacts");

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw RequestError(404, `Contact with ${id} not found`);
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = remove;