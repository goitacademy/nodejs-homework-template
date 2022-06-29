const { Contact, contactsJoiSchema, favoriteJoiSchema } = require("./contact");
const {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscribtionSchema,
} = require("./user");

module.exports = {
  Contact,
  contactsJoiSchema,
  favoriteJoiSchema,
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscribtionSchema,
};
