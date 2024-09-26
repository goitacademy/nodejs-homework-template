const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { hendleMongooseError } = require("../helpers");

const phonePattern = /^\(\d{3}\)\s\d{3}-\d{4}$/;
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailPattern,
      required: true,
    },
    phone: {
      type: String,
      match: phonePattern,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
bookSchema.post("save", hendleMongooseError);

const addSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().pattern(emailPattern).required(),
  phone: Joi.string().pattern(phonePattern).required(),
  favorite: Joi.boolean(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const Contact = model("contact", bookSchema);
const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas,
};
