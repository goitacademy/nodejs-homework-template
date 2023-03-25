const { model, Schema } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(3).max(30).required(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  add: addSchema,
  updateStatus: updateStatusSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
