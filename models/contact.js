const Joi = require("joi");
const { Schema, model } = require("mongoose");
const {handleMongooseError}= require("../helpers")

const emailRegexp = /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/   // Nick@mail.com
const phoneRegexp = /\(\d{3}\)\s?\d{3}-\d{4}$/;  // (222) 333-4444


const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: emailRegexp,
    required: true
  },
  phone: {
    type: String,
    match: phoneRegexp,
    required: true
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
  type: Schema.Types.ObjectId,
  ref: "user",
  required: true,
  }
}, {versionKey: false, timestamps: true});

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports ={
    Contact,
    schemas,
}