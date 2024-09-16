const { contactSchema, updateFavoriteSchema } = require('./contactSchema');
const {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
} = require('./userSchema');


module.exports = {
    contactSchema,
    updateFavoriteSchema,
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
};