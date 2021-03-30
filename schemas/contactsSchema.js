const mongoose = require('mongoose');
  const { Schema } = mongoose;

  const contactSchema = new Schema({
    name:  {
      type: String,
      required: [true, 'Enter your name']},
    email: {
      type: String,
      required: [true, 'Enter your email'],
      unique: true
    },
    phone:{
      type: String,
      required: [true, 'Enter your phone number']
    },
    subscription: String,
    password: {
      type: String,
      minlength: 7,
      maxlength: 15,
      required: [true, 'Password is required']
    },
    token: Number,
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
  );

  const Contact = mongoose.model('contact', contactSchema)

  module.exports = Contact