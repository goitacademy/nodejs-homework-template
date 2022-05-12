const {
	contactSchema,
	joiContactSchema,
	joiStatusSchema,
	Contact,
} = require('./contact')

const { User, joiUserSchema } = require('./user')

module.exports = {
	contactSchema,
	joiContactSchema,
	joiStatusSchema,
	Contact,
	User,
	joiUserSchema,
}
