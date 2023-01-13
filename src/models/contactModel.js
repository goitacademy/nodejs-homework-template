import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [4, 'name should be at least 4 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      minLength: [7, 'name should be at least 7 characters'],
      maxLength: [16, 'name should be at least 16 characters'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Contact = model('Contact', contactSchema);
