const contactOperation = require("../../models/contacts");
const { NotFound } = require("http-errors");
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactOperation.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id=${contactId} deleted`,
  });
};

module.exports = removeContact;
