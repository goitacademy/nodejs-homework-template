const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(`Product with id = ${contactId} not found`);
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
