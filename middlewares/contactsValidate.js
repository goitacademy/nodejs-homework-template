const {
  contactSchema,
  contactSchemaRequired,
  contactSchemaFavorite,
} = require("../validation/contactsSchema");

const validator = (Schema) => {
  return (req, res, next) => {
    const { error } = Schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = `missing required ${error.details[0].path[0]} field`;
      next(error);
    }
    next();
  };
};

const validation = validator(contactSchema);

const validationRequired = validator(contactSchemaRequired);

const validationFavorite = validator(contactSchemaFavorite);

module.exports = { validation, validationRequired, validationFavorite };
