const { NotFound, InternalServerError } = require("http-errors");
const contactsOperations = require("../../model/contacts");

const removeContact = async (req, res, next) => {
  const result = await contactsOperations.removeContact(req.params.contactId);
  if (!result) {
    throw new InternalServerError("Unable to remove, try again later");
  }
  if (result === -1) {
    throw new NotFound(`Contact with id=${req.params.contactId} not found`);
  }
  res.json({
    status: "Succeed",
    code: 200,
  });
};

module.exports = removeContact;
