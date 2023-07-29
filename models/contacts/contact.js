const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../helpers");

const Joi = require("joi");

// const genreList = [true, "Andriy, Mikha, Orest, Ostap, Ivan, Sofia, Eva, Anita"];

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // для валідації name required: genreList,
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
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

// Data validation ==========================================

// для валідації name .valid(...genreList)
const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(
      /^(?:\+\d{1,3})?(?:\(?\d{2,3}\)?[-\s]?)?\d{2,4}(?:[-\s]?\d{2,4}){2}$/
    )
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  createContactSchema,
  updateFavoriteSchema,
};
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
