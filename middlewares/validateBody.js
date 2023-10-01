const { contactSchema, updateContactSchema } = require("../helpers/validation");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { body } = req;

    const { error } = schema.validate(body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      next();
    }
  };
};

module.exports = {
  validateContactBody: validateBody(contactSchema),
  validateUpdateContactBody: validateBody(updateContactSchema),
};
