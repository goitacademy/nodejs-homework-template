import { Schema, model, Document } from "mongoose";
import Joi from "joi";

import { handleMongooseError } from "../../helpers";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  favorite: string;
  owner: string;
}

declare global {
  namespace Express {
    interface Request {
      contact?: IContact;
    }
  }
}

const contactSchema = new Schema(
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
      required: [true, "Set phone number for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const Contact = model<IContact>("contact", contactSchema);

export { Contact, addSchema };
