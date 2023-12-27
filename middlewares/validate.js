const {
  contactSchema,
  contactSchemaRequired,
  contactSchemaFavorite,
} = require("../validation/contactsSchema");

const { registerSchema, loginSchema } = require("../validation/authSchema.js");

const validator = (Schema) => {
  return (req, res, next) => {
    const { error } = Schema.validate(req.body);
    if (error) {
      const { name, code } = error;
      error.status = name == "MongoServerError" && code == 11000 ? 409 : 400;
      error.message = `missing required ${error.details[0].path[0]} field`;
      next(error);
    }
    next();
  };
};

const validation = validator(contactSchema);

const validationRequired = validator(contactSchemaRequired);

const validationFavorite = validator(contactSchemaFavorite);

const validationRegister = validator(registerSchema);

const validationLogin = validator(loginSchema);

module.exports = {
  validation,
  validationRequired,
  validationFavorite,
  validationRegister,
  validationLogin,
};
