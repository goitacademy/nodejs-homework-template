const {
	contactSchema,
	joiContactSchema,
	joiStatusSchema,
	Contact,
} = require('./contact')

const { User, joiSignupSchema, joiLoginSchema } = require('./user')

module.exports = {
	contactSchema,
	joiContactSchema,
	joiStatusSchema,
	Contact,
	User,
	joiSignupSchema,
	joiLoginSchema,
}
