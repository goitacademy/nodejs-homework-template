import { Schema, model } from "mongoose";
import helpers from "../helpers/index.js";
import Joi from "joi";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      // required: [true, "Set name for contact"],
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
);

contactSchema.post("save", helpers.handleMongooseError);
contactSchema.pre("findOneAndUpdate", helpers.handleUpdateSchema);
contactSchema.post("findOneAndUpdate", helpers.handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const addFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const Contact = model("contact", contactSchema);

const schemas = { addSchema, addFavoriteSchema };

export default { Contact, schemas };
