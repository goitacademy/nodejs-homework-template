const contactOperations = require("../../models/contacts");
const Joi = require("joi");
const { NotFound } = require("http-errors");

const contactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const updateContactById = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    error.status = 404;
    throw error;
  }
  const { id } = req.params;
  // const { name, email, phone } = req.body;

  const result = await contactOperations.updateContactById(id, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateContactById;
