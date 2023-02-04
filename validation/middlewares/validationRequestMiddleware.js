const createError = require("../../helpers/createError");
const {
  validationAddContact,
  validationUpdateContact,
  validationUpdateFavorite,
} = require("../createContactValidation");

function validateRequestBody(req, _, next) {
  switch (req.route.path) {
    case "/":
      checkValidationBody(validationAddContact, req.body);
      break;
    case "/:contactId":
      checkValidationBody(validationUpdateContact, req.body);
      break;
    case "/:contactId/favorite":
      checkValidationBody(validationUpdateFavorite, req.body);
      break;
    default:
      console.log("everything is OK");
  }

  next();
}

module.exports = validateRequestBody;

function checkValidationBody(schema, body) {
  const { error } = schema.validate(body);
  if (error) {
    throw createError(400, error.message);
  }
}
