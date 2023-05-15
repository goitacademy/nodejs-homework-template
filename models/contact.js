const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const joi = require("joi");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
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
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMongooseError);

const addSchema = joi.object({
    name: joi.string()
        .alphanum()
        .min(2)
		.max(30)
		.pattern(/^[A-Za-z ]+$/)
        .required(),
    
    email:joi.string().email({ minDomainSegments: 2 }).required(),
    phone: joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .messages({
			"string.pattern.base": "Invalid phone number format. The format should be (XXX) XXX-XX-XX.",
		})
        .required(),
    favorite: joi.boolean(),
});
  
const updateSchema = joi.object({
    name: joi.string().min(3).max(18),
    email: joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: joi.string().min(10).max(15),
    favorite: joi.boolean(),
  });

  const updateFavoriteSchema = joi.object({
    favorite: joi.boolean().required(),
  })

const schemas = {
    addSchema,
	updateSchema,
    updateFavoriteSchema,
};


const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
