import { Schema, model } from "mongoose";

import { handleSaveError, handlePreValidate } from "./hooks.js";

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
			required: [true, "Set phone of contact"],
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false },
);

contactSchema.pre("findOneAndUpdate", handlePreValidate);

contactSchema.post("save", handleSaveError);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
