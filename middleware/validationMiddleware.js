const {
    joiContactSchema
} = require("../validation/contacts");

const validateContact = (req, res, next) => {
    const { error } = joiContactSchema.validate(req.body);
    const { name, email, phone } = req.body;

      if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
      }
    
  if (error) {
      const errorMessages = error.details.map((detail) => {
      if (detail.type === 'any.required') {
        return  `Missing required ${detail.context.key} fields` ;
      } else if (detail.type === 'string.base') {
        return `${detail.context.key} must be a string`;
      } else if (detail.type === 'string.empty') {
        return `${detail.context.key} cannot be empty`;
      }
      return `${detail.context.key} validation failed`;
    });

      res.status(400).json({ message: errorMessages.join(", ") });
  } else {
    next();
  }
};

module.exports = {
  validateContact
};