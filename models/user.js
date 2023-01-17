const { Schema, model } = require("mongoose");
const Joi = require("joi")
const bcrypt = require("bcryptjs")

const userShema = Schema({
    
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
        default: "starter"
    },
    token: {
        type: String,
        default: null
    },
    avatarURL: {
        type: String,
        require: true
    }

}, { versionKey: false, timestamps: true });

userShema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userShema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password , this.password)
}

const joiRegisterSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
    email: Joi.string().required(),
    password: Joi.string().required()
});

const joiLoginSchema = Joi.object({
    subscription: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

const User = model("user", userShema);

module.exports = {
    joiRegisterSchema, 
    User,
    joiLoginSchema
}