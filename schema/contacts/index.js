const { joiContactSchema, joiFavoriteSchema } = require("./joiContacts");
const mongooseContactSchema = require("./mongooseContacts");

module.exports = {
  joiContactSchema,
  joiFavoriteSchema,
  mongooseContactSchema,
};
