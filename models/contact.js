const { Schema, model } = require("mongoose");
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
      owner: {
      type: Schema.Types.ObjectId,
        ref: 'user',
      required:true
    }
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);
const Joi = require("joi");
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});


module.exports = {
  Contact,
  contactsSchema
}
