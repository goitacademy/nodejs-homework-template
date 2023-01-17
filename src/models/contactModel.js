import mongoose, { SchemaTypes } from 'mongoose';
mongoose.set('strictQuery', true);

const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [4, 'Name should be at least 4 characters'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      minLength: [7, 'Phone should be at least 7 characters'],
      maxLength: [16, 'Phone should be at least 16 characters'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Contact = model('Contact', contactSchema);
