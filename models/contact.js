/* eslint-disable semi */
/* eslint-disable quotes */
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
    //   enum: ["basic", "sale", "stock"],
    //   default: "basic",
    // minlength: 2,
    // maxlength: 30,
    // min: 0.01  - подходит к графе цена.
    // unique: true, - работает только с настройкой в приложении MongoDB Mongoose(вкладка "Indexes"),
    // match: /^[0-9]{9}$^/
    // },
  },
  {
    versionKey: false,
    // timestamps: true - включает параметр время создания и обноывления контакта.
  }
);

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const statusContactJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactJoiSchema, statusContactJoiSchema };
