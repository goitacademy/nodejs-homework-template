const {Contact, joiSchema, favoriteJoiSchema} = require('./contact')
const {User, joiSignUpSchema, joiLoginSchema, subscriptionJoiSchema} = require('./user')
module.exports = {
    Contact, 
    joiSchema,
    favoriteJoiSchema,
    User,
    joiSignUpSchema, 
    joiLoginSchema,
    subscriptionJoiSchema
};