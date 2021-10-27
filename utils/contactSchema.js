// const Joi = require("joi")

// const contactSchema = Joi.object({
//   name: Joi.string().min(2).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.number().required(),
// })

const { Schema, model } = require("mongoose")

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
  },
  { versionKey: false, timestamps: true }
)

const Contact = model("contact", contactSchema)

module.exports = Contact

// {
//     "name": "lalala",
//     "email": "lalalala@mail.com",
//     "phone": "80299999999"
// }
