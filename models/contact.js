<<<<<<< HEAD
<<<<<<< HEAD
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contacts = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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
    ref: "user",
  },
});

const Contact = mongoose.model("contact", contacts);

module.exports = { Contact };
=======
<<<<<<< HEAD
=======
>>>>>>> master
const { Schema, model } = require('mongoose');
const { handleSaveErrors } = require('../helpers');
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
=======
const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const nameRegexp = /^[A-Za-zА-Яа-я ]+$/;
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

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
	},
	{ versionKey: false, timestamps: true },
);
>>>>>>> master

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
		.max(30)
		.pattern(/^[A-Za-z ]+$/)
        .required(),
    
    email:Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .messages({
			"string.pattern.base": "Invalid phone number format. The format should be (XXX) XXX-XX-XX.",
		})
        .required(),
    favorite: Joi.boolean(),
})

<<<<<<< HEAD
const addSchema = joi.object({
    name: joi.string().min(3).max(18).required(),
    email: joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }).required(),
    phone: joi.string().min(10).max(15).required(),
    favorite: joi.boolean(),
  })
  
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

module.exports = {
    Contact,
    addSchema,
    updateSchema,
    updateFavoriteSchema
};
=======
const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};


const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
>>>>>>> master
<<<<<<< HEAD
>>>>>>> 03ddca3ab856225ac93889b1ec630c997ac37fef
=======
>>>>>>> master
