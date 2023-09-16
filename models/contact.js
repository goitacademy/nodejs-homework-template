import { Schema, model } from "mongoose";
import Joi from "joi";
import { hookError, runValidateAtUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", hookError);
// contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);
// contactSchema.post("findOneAndUpdate", hookError);

const Contact = model("contact", contactSchema);

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `"name" mast be exist` }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": `"email" mast be exist` }),
  phone: Joi.string()
    .required()
    .pattern(
      /^[(][0-9]{3}[)][\s][0-9]{3}-[0-9]{4}$/,
      `"Phone number must be type: "(***) ***-****""`
    )
    .messages({ "any.required": `"phone" mast be exist` }),
  favorite: Joi.boolean(),
});

export default Contact;
