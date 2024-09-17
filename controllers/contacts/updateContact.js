const contactOperation = require("../../models/contacts");
const { NotFound, BadRequest } = require("http-errors");
const { contactSchema } = require("../../schemas/contacts");
const updateContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw BadRequest(error.message);
  }

  const { contactId } = req.params;
  const result = await contactOperation.updateContact(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
