const  {model, Schema} = require('mongoose');

const contactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    //   match: /^\d{3}-\d{3}-\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },{versionKey: false
    // ,timestamps: true
})

const Contact = model('contact', contactSchema);

module.exports = Contact;