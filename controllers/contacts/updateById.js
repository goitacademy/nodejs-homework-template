const { HttpError } = require("../../helpers");
const contacts = require("../../models/contacts");

const updateById = async (req, res) => {
  const result = await contacts.updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateById;
