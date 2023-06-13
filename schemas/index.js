const { contactUpdateSchema, contactUpdateFavoriteSchema } = require('./contacts');
const { userRegisterSchema, userLoginSchema } = require('./user');

module.exports = {
    contactUpdateSchema,
    contactUpdateFavoriteSchema,
    userRegisterSchema,
    userLoginSchema
}