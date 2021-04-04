const mongoose = require('mongoose');
  const { Schema } = mongoose;
  const mongoosePaginate = require('mongoose-paginate-v2');  

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
    token: Number,
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
  );
  
  contactSchema.plugin(mongoosePaginate);

  const Contact = mongoose.model('contact', contactSchema)


  module.exports = Contact