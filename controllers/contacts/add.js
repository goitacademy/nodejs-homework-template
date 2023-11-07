const operations = require("../../models/contacts");
const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const add = async (req, res) => {
  const body = req.body;
  const { error } = schema.validate(body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const result = await operations.addContact(body);
  res.status(201).json({
    status: "success",
    code: "201",
    data: {
      result,
    },
  });
};

module.exports = add;
