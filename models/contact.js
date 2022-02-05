const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
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
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    tlds: { allow: ["com", "net"] },
  }),

  phone: Joi.string().min(10).max(10).messages({
    "string.max": `"phone" should be 10 characters`,
    "string.min": `"phone" should be 10 characters`,
  }),

  favorite: Joi.boolean(),
})
  .with("name", "email")
  .with("email", "phone");

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas: {
    add: joiAddContact,
    updateFavorite: joiUpdateFavoriteSchema,
  },
};
