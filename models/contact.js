const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers/index");

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
    
        email: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
        },

        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,    
        },
    },

    {
        versionKey: false,
        timestamps: false,
    }
);


const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const changeSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
}).min(1);

const schemas = {
    addSchema,
    updateFavoriteSchema,
    changeSchema,
};

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);


module.exports = {
    Contact,
    schemas,
};