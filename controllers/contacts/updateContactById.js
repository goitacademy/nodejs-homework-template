const contactsOperations = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateContactById;
