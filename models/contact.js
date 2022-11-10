const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false, timestamps: true});

  
  const handleSaveErrors = (error, _, next) => {
	const { name, code } = error;
	if (name === "MongoServerError" && code === 11000) {
		error.status = 409;
	} else {
		error.status = 400;
	}

	next();
};
contactSchema.post("save", handleSaveErrors);

const checkFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });

const addSchema = Joi.object({
    name: Joi.string().required(),
    phone:Joi.string().min(10).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    favorite: Joi.boolean(),
  })

  const schemas = {
    addSchema,
    checkFavoriteSchema,
  }

const Contact = model("contact", contactSchema);

module.exports = {
schemas,
  Contact,
}