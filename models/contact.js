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
    // status: {
    //   type: String,
    //   enum: ["basic", "strong", "low"],
    //   default: "basic",
    // },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  // status: Joi.string().valid("basic", "strong", "low"),
});

// const statusJoiSchema = Joi.object({
//   status: Joi.string().valid("basic", "strong", "low").required(),
// });

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
  // statusJoiSchema,
};
