const contactsOperations = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({
    message: `Contact with id=${contactId} deleted`,
  });
};

module.exports = deleteContactById;
