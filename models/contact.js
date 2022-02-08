const { Schema, model } = require("mongoose");
const Joi = require("joi");

const codeRegexp = /^[a-zA-Z]+/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: codeRegexp,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
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

const JoiAddContactSchema = Joi.object({
  name: Joi.string().pattern(codeRegexp).min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } }),
  phone: Joi.string().length(14).required(),
  favorite: Joi.boolean(),
});

const JoiPatchFavoriteSchema = Joi.object({
  favorite: Joi.string().valid("true", "false").required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas: {
    add: JoiAddContactSchema,
    patchFavorite: JoiPatchFavoriteSchema,
  },
};
