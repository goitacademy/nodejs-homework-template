const { model, Schema } = require('mongoose');
const { genSalt, hash, compare } = require('bcrypt');

const userSchema = new Schema({
	password: {
		type: String,
		required: [true, 'Set password for user'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	subscription: {
		type: String,
		enum: ["starter", "pro", "business"],
		default: "starter",
	},
	token: {
		type: String,
		default: '',
	},
},
	{
		versionKey: false,
		timestamps: true,
	}
)

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	const salt = await genSalt(10);
	this.password = await hash(this.password, salt);

	next();
});

userSchema.methods.checkPassword = (candidate, passwdHash) => compare(candidate, passwdHash);


const users = model('users', userSchema);

module.exports = users;