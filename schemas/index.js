const { contactSchema, dataRegexp } = require("./contactSchema");
const { favoriteSchema } = require("./favoriteSchema");
const { contactPutSchema } = require("./contactPutSchema");

const schemas = {
  contactSchema,
  favoriteSchema,
  contactPutSchema,
  dataRegexp,
};
module.exports = { schemas };
