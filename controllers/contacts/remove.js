const { NotFound } = require("http-errors");
const { removeContact } = require("../../models/contacts");

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = remove;