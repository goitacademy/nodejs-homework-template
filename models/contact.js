const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers/handleMongooseError");

const contactSchema = new Schema(
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
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const emptyBody = Joi.object()
  .min(1)
  .messages({ "object.min": "Missing fields" });

const emptyBodyFavorite = Joi.object()
  .min(1)
  .messages({ "object.min": "Missing field favorite" });

const addShema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "missing required email field" }),
  favorite: Joi.boolean(),
});

const updateFavoriteShema = Joi.object({
  favorite: Joi.boolean().required(),
});

const shemas = {
  addShema,
  updateFavoriteShema,
  emptyBody,
  emptyBodyFavorite,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  shemas,
};
