const { removeContact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const deleteContact = async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    throw NotFound(`Contact with id=${req.params.contactId} not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
