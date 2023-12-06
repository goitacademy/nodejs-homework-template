const { updateFavoriteSchema, addSchema } = require("./contacts");
const { registerAndLoginSchema, emailSchema } = require("./users");

module.exports = {
  addSchema,
  updateFavoriteSchema,
  registerAndLoginSchema,
  emailSchema,
};
