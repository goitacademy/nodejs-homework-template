import mongoose from "mongoose";
import { contactSchema } from "#validators/contactSchema.js";

export const Contact = mongoose.model("contact", contactSchema, "contacts");
