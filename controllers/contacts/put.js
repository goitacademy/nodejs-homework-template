const contacts = require("../../models/contacts");
const { addContactShema } = require("../../shema/contacts");
const { RequestError } = require("../../helpers");

const put = async (req, res) => {
  const { error } = addContactShema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContactsById(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};
module.exports = put;
