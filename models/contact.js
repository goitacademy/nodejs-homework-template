
const mongoose = require("mongoose");
const Joi = require("joi");

const contactSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: [true, 'Set name for contact']
    },
    email: {
      type: String, unique: true ,
      
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: String,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
);
const validSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().min(6).required(),
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = { Contact, validSchema };
