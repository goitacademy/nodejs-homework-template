const { updateContact } = require("../../models/contacts");
const { HttpError } = require("../../utils");

const updateOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateOneContact;
