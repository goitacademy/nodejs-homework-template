const { Schema, model } = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id
            return ret
        },},
        toObject: { virtuals: true },
    }
)

userSchema.methods.setPassword = function(password){
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.createToken = function(){
    const payload = {
        _id: this._id
    };
    return jwt.sign(payload, SECRET_KEY);
}

const User = model('user', userSchema)

module.exports = User