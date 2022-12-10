const contacts = require("../../models/contacts");
const { HttpErrors } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);

  if (!result) {
    throw HttpErrors(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;
