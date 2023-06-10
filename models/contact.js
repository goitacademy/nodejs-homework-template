const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares");


const contactSchema = new Schema({
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
 }, { versionKey: false });

 contactSchema.post("save", handleMongooseError);

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object ({
	favorite: Joi.boolean().required()
})

const Contact = model("contact", contactSchema);

const schemas = {
	contactsAddSchema,
	updateFavoriteSchema,
 };

module.exports = {
	Contact,
	schemas,
}