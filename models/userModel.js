const { model, Schema } = require('mongoose');
const { genSalt, hash, compare } = require('bcrypt');
const crypto = require('crypto');

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
	avatar: String,
	passwordResetToken: String,
	passwordResetTokenExp: Date,
	verify: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
	}

},
	{
		versionKey: false,
		timestamps: true,
	}
)

userSchema.pre('save', async function (next) {
	if (this.isNew) {
		const emailHash = crypto.createHash('md5').update(this.email).digest('hex');

		this.avatar = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=robohash`;
	}

	if (!this.isModified('password')) return next();

	const salt = await genSalt(10);
	this.password = await hash(this.password, salt);

	next();
});

userSchema.methods.newPassword = async (password) => {
	const salt = await genSalt(10);
	const newPassword = await hash(password, salt);
	return newPassword;

}

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetTokenExp = Date.now() + 10 * 60 * 1000;

	return resetToken;
};



userSchema.methods.createVerificationToken = function () {
	const verToken = crypto.randomBytes(32).toString('hex');
	return verToken;
};



userSchema.methods.checkPassword = (candidate, passwdHash) => compare(candidate, passwdHash);


const users = model('users', userSchema);

module.exports = users;