import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		// favorite: {
		// 	type: Boolean,
		// 	default: false,
		// },
	},
	{ versionKey: false, timestamps: true }
);

const Contact = model('contact', contactSchema);

export default Contact;
