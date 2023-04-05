const {
  contactSchema,
  contactSchemaRequired,
} = require("../validation/contactsSchema");

const validation = (contactSchema) => {
  return (req, res, next) => {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = `missing required ${error.details[0].path[0]} field`;
      next(error);
    }
    next();
  };
};

const validationRequired = (contactSchemaRequired) => {
  return (req, res, next) => {
    const { error } = contactSchemaRequired.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = `missing required ${error.details[0].path[0]} field`;
      next(error);
    }
    next();
  };
};

module.exports = { validation, validationRequired };
