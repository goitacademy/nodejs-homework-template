const { joiSchema, joiSchemaUpdate } = require("./contactsValid");
const { authJoiSchema } = require("./userValid");

module.exports = {
  joiSchema,
  joiSchemaUpdate,
  authJoiSchema,
};
