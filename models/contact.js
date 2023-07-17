const { Schema, model } = require("mongoose");

const { handlerMongooseError } = require("../helpers/handlerMongooseError");

const Joi = require("joi");

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
      require: true,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handlerMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const sсhemas = {
  addSchema,
  updateStatusContact,
};

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
  sсhemas,
};
