const { contactUpdateSchema, contactUpdateFavoriteSchema } = require('./contacts');
const { userRegisterSchema, userLoginSchema, resendVerificationLinkSchema } = require('./user');

module.exports = {
    contactUpdateSchema,
    contactUpdateFavoriteSchema,
    userRegisterSchema,
    userLoginSchema,
    resendVerificationLinkSchema
}