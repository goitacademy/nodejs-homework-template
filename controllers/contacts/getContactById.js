const contacts = require("../../models/contacts");
const { requestError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactById;
