const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.Types.ObjectId

const ContactsSchema = new Schema( {
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
  // owner: [{
  //           type: ObjectId,
  //           ref: 'user',
  //         }]
});

  const Contacts = mongoose.model('Contacts', ContactsSchema)
  module.exports= Contacts;
 


