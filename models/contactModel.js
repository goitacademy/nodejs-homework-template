const { Schema, model } = require("mongoose");
const  handleMongooseError  = require("../middlewares/handleMongooseError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: [true, "Set email for contact"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleMongooseError);

// const Joi = require("joi");

// const addContactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().min(7).max(15).required(),
//   favorite: Joi.boolean(),
// });

// const updateContactSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// module.exports = { addContactSchema, updateContactSchema };

const Contact = model("contact", contactSchema);

module.exports = Contact;
