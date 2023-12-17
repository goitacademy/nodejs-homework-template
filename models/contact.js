const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");

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
			ref: "user",
			required: true,
		},
},{ versionKey: false, timestamps: true })

contactSchema.post("save", handleMongooseError)

const addSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "missing name field",
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .messages({
        "any.required": "missing email field",
      }),
    phone: Joi.string().min(10).max(15).required().messages({
      "any.required": "missing phone field",
    }),
    favorite: Joi.boolean(),
  });

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": "missing field favorite",
      }),
})

const schemas = {
    addSchema, 
    updateFavoriteSchema,
}  

const Contact = model("contact", contactSchema);

module.exports = {
   Contact,
   schemas,
} 