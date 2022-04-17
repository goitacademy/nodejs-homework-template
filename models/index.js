const {Contact, joiContactSchema, joiFavoriteSchema} = require('./contact');
const {User, joiUserSchema, joiSubscriptionSchema } = require('./user');

module.exports = {
    Contact,
    joiContactSchema,
    joiFavoriteSchema,
    User,
    joiUserSchema,
    joiSubscriptionSchema
}