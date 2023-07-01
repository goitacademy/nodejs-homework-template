const Joi = require("joi");
const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers");

const schema = mongoose.Schema(
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
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false, timestamps: true }
);
schema.post("save", handleMongooseError);
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = { addSchema, schema, updateFavoriteSchema };
