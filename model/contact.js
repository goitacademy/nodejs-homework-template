import mongoose from 'mongoose';
import { MIN_AGE, MAX_AGE } from '../library/constants'
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  age: {
    type: Number,
    min: MIN_AGE,
    max: MAX_AGE,
    default: null
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
}, { versionKey: false, timestamps: true });

const Contact = model('contact', contactSchema)

export default Contact