const { HttpError } = require("../../helpers");
const contacts = require("../../models/contacts");

const getById = async (req, res) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
