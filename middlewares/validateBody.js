const { contactSchema, updateContactSchema } = require("./validation");

const validateBody = (schema) => {
  return (req, res, next) => {
    if (req.method === "POST" && req.originalUrl === "/api/contacts") {
      const { body } = req;

      const { error } = schema.validate(body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
      } else {
        next();
      }
    } else {
      next();
    }
  };
};


module.exports = {
  validateContactBody: validateBody(contactSchema),
  validateUpdateContactBody: validateBody(updateContactSchema),
};
