const mongoose = require("mongoose");
const Joi = require("joi");

const validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
    phone: Joi.string(),
    favorite: Joi.bool()
});

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
            unique: true,
            minLength: [2, "is too short!!"],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
        },
        phone: {
            type: String,
            match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        
    },
        {
           timestamps: true,
        }
);
    
const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = mongoose.model("contact", schema);

module.exports = { Contact, validationSchema, updateFavoriteSchema };
