const {
  contactSchema,
  updateFavoriteSchema,
} = require("../../schemas/index.js");
const { validateBody } = require("../../decorators/index.js");

const favoriteUpdate = validateBody(updateFavoriteSchema);
const addContactValidate = validateBody(contactSchema);

module.exports = { addContactValidate, favoriteUpdate };
