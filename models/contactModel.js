const {Schema, model} = require('mongoose');
const {handleMongooseError} = require('../middlewares');
 
const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique:[true, 'Set email for contact'],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  
},{
  versionKey: false, timestamps: true,
});

contactSchema.post("save", handleMongooseError);


const Contact = model('contact', contactSchema);

module.exports = Contact;