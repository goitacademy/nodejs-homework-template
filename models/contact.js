import { Schema, model } from 'mongoose';

import { handleSaveError, preUpdate } from './hooks.js';

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
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', preUpdate);

contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contact', contactSchema);

export default Contact;
