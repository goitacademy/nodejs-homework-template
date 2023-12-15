import Joi from 'joi';
import { Schema, model } from "mongoose";
import { handleSaveError, addUpdateSetting } from '../models/hooks.js'
const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
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
    ref: 'user',
    required: true,
  }

}, { versionKey: false, timestamps: true });

contactsSchema.post('save', handleSaveError)
contactsSchema.pre('findOneAndUpdate', addUpdateSetting)
contactsSchema.post('findOneAndUpdate', handleSaveError)

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean()


})
export const contactUpdateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean()

})
export const contactUpdateFavoritesSchema = Joi.object({
  favorite: Joi.boolean().required(),

})

const Contact = model('contact', contactsSchema);

export default Contact;

