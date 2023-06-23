const { contactAddSchema, contactUpdateFavoriteSchema } = require("./contactJoi");
const contactSchema = require("./contactMongoose");

module.exports = {
  contactAddSchema,
  contactSchema,
  contactUpdateFavoriteSchema,
};
