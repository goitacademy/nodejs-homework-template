import mongoose from "mongoose";
import { contactSchema } from "#validators/contacts/MongooseSchema.js";

export const Contact = mongoose.model("contact", contactSchema, "contacts");
