const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError, patterns } = require("../helpers");

const { nameRegexp, phoneRegexp } = patterns;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			match: nameRegexp,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			match: phoneRegexp,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false, timestamps: true },
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
		.max(30)
		.pattern(nameRegexp)
        .required(),
    
    email:Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string()
        .pattern(phoneRegexp)
        .messages({
			"string.pattern.base": "Invalid phone number format. The format should be (XXX) XXX-XX-XX.",
		})
        .required(),
    favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};


const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
