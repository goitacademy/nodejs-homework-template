const Joi = require("joi");

const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});
contactSchema.post("findOneAndUpdate", (error, data, next) => {
  error.status = 400;
  next();
});
contactSchema.pre("findOneAndUpdate", function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
});

const addContactChema = Joi.object({
  name: Joi.string()
    .max(15)
    .required()
    .messages({ "any.required": `missing required "name" field` }),
  email: Joi.string()
    .required()
    .messages({ "any.required": `missing required "email" field` }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": `missing required "phone" field` }),
  favorite: Joi.boolean(),
});

const updateContactChema = Joi.object({
  name: Joi.string().min(3).max(15),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
const updateFavoriteChema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  addContactChema,
  updateContactChema,
  updateFavoriteChema,
  Contact,
};
