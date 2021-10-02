const { NotFound, InternalServerError, BadRequest } = require("http-errors");
const contactsOperations = require("../../model/contacts");

const updateContact = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw new BadRequest("Updates required!");
  }

  const result = await contactsOperations.updateContact(
    req.params.contactId,
    req.body
  );
  if (result === -1) {
    throw new NotFound(`Contact with id=${req.params.contactId} not found`);
  }
  if (!result) {
    throw new InternalServerError("Unable to update, try again later");
  }
  res.json({
    status: "Succeed",
    code: 200,
    data: result,
  });
};

module.exports = updateContact;
