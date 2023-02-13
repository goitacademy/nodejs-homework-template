import mongoose from 'mongoose';
import { ContactType } from 'types/Contact.type';
import { phonePattern, validationFields } from 'helpers/validation';

const isEmailValid = (email: string) => validationFields.email.validate(email);

const schema = new mongoose.Schema<ContactType>({
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
});

export const ContactModel = mongoose.model('Contact', schema);
