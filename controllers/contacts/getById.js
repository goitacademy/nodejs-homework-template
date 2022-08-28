const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getById = async (reg, res) => {
  const { contactId } = reg.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
