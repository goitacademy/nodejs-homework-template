const Contact = require("../../models/schema");
const { NotFound } = require("http-errors");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await Contact.findByIdAndRemove(contactId);
  if (!data) {
    throw NotFound(`Contact with id=${req.params.contactId} not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
