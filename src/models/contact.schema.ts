import mongoose, { Schema, Types } from 'mongoose';
import { ContactType } from 'types/Contact.type';
import { isEmailValid, phonePattern } from 'helpers/validation';

const schema = new Schema<ContactType>(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      validate: [isEmailValid, 'Please fill a valid email address'],
    },
    phone: {
      type: String,
      match: [phonePattern, 'Please fill a valid phone number'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const ContactModel = mongoose.model('Contact', schema);
