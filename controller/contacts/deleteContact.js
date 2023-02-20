const { removeContact } = require("../../models/contacts");

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = deleteContact;
