import { Schema, model } from "mongoose";
import joi from "joi";
import { patterns } from "./../helpers";
import { User } from "./";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
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

const joiContactSchema = joi.object({
  name: joi.string().min(1).max(30).pattern(patterns.name, "name"),

  email: joi.string().email({ minDomainSegments: 2 }),

  phone: joi.string().pattern(patterns.phone, "phone"),

  favorite: joi.boolean(),

  owner: joi.any(),
});

const Contact = model("contact", contactSchema);

export { contactSchema, joiContactSchema, Contact };
