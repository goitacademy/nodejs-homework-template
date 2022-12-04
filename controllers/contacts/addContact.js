const contactOperation = require("../../models/contacts");
const { BadRequest } = require("http-errors");
const { contactSchema } = require("../../schemas/contacts");
const addContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    throw BadRequest(error.message);
  }
  const result = await contactOperation.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
