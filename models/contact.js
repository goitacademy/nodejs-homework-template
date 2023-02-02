const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

// add regexp for email validation

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      length: 10,
      required: [true, "Phone number must have 10 digits."],
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

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .required(),
  favorite: Joi.boolean(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    }),
  favorite: Joi.boolean(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
});

const updateFavoriteSchema = Joi.object({
  favorite : Joi.boolean().required()
})

const schemas = {
  addSchema,
  updateSchema,
  updateFavoriteSchema
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
