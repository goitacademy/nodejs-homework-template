const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;

// --------mongoose shema--------
const contactShema = new Schema(
  {
    name: { type: String, minlength: 3, maxlength: 14, required: true },
    email: { type: String, unique: true, required: true },
    phone: {
      type: String,
      match: [phoneRegex, "Phone number must be in format (000) 000-0000"],
      required: true,
    },
    favorite: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true }
);

contactShema.post("save", handleMongooseError);

// --------Joi shemas--------
const addShema = Joi.object({
  name: Joi.string().min(3).max(14).required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteShema = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = {
  addShema,
  updateFavoriteShema,
};

const Contact = model("contact", contactShema);

module.exports = { Contact, schemas };
