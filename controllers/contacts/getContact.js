const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers/RequestError");

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContact;
