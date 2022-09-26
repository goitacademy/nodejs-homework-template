const { Schema, model } = require('mongoose');
const handleSchemaValidationError = require('../helpers/handleSchemaValidationError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const userSchema = Schema(
    {
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
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },
        token: String,
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setToken = function (payload) {
    this.token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

userSchema.methods.deleteToken = function () {
    this.token = null;
};

userSchema.post('save', handleSchemaValidationError);

const User = model('user', userSchema);

module.exports = User;
