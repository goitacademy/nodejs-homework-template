const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");


const validEnumValues = ["starter", "pro", "business"];

const userSchema = new Schema({

    password: {
        type: String,
        minlength:6,
        required: [true, 'Set password for user'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },

    subscription: {
        type: String,
        enum: validEnumValues,
        default: "starter",
    },

    token: {
        type: String,
        default : null, 
    }, 

    avatarURL: {
		type: String,
		require: true,
	},
    
},
{ versionKey: false, timestamps: false });



const registerSchema = Joi.object({

    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
        .required()
    ,

    password: Joi
        .string()
        .min(6)
        .required()
    ,

    subscription: Joi
        .string()
    ,
});

const loginSchema = Joi.object({

    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
        .required()
    ,

    password: Joi
        .string()
        .min(6)
        .required()
    ,
});

const updateSubscriptionSchema = Joi.object({

    subscription: Joi
        .string()
		.valid(...validEnumValues)
        .required()
    ,
    
}).unknown(false);

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
};

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);


module.exports = {
    User,
    schemas,
};