const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

// const bcrypt = require("bcrypt"); //! Абсолютно идентичен с bcryptjs
const bcrypt = require("bcryptjs");

//-----------------------------------------------------------------------------
const userSchema = Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
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
}, { versionKey: false, timestamps: true });


//!  Хеширование и засока password с помошью bcryptjs (или bcrypt) - 1 вариант
// userSchema.pre("save", async function () {
//     if (this.isNew) {
//         this.password = await bcrypt.hash(this.password, 10)
//     };
//     // TODO: if user changed his password
// });

//!  Хеширование и засока password с помошью bcryptjs (или bcrypt) - 3 вариант (самый сложный)
userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//!  Сравнение паролей
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}



//! Правильный код ошибки contactSchema
userSchema.post("save", handleSchemaValidationErrors)


//* ++++++++++++++++++++++ Схемы ВАЛИДАЦИИ Joi +++++++++++++++++++++++++
const subscriptionList = ["starter", "pro", "business"];

const registerJoiSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .required(),
    password: Joi.string()
        .min(3)
        .required(),
    subscription: Joi.string()
        .valueOf(...subscriptionList)
        .optional(),
});
//--------------------------------------------------------------------
const loginJoiSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .required(),
    password: Joi.string()
        .min(3)
        .required(),
});
//--------------------------------------------------------------------
const changeSubscriptionJoiSchema = Joi.object({
    subscription: Joi.string()
        .valueOf(...subscriptionList)
        .required(),
});
//* _______________________ Схемы ВАЛИДАЦИИ Joi _______________________


//? Создаем МОДЕЛЬ:
const User = model("user", userSchema); //! DB_HOST



module.exports = {
    User,
    registerJoiSchema,
    loginJoiSchema,
    changeSubscriptionJoiSchema
};

