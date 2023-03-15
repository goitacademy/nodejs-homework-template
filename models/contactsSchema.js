const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

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
  owner: [{
            type: ObjectId,
            ref: 'user',
          }]
 });

  // if( !mongoose.Types.ObjectId.isValid(_id) ) return false;
  const Contacts = mongoose.model('myContacts', ContactsSchema)
  module.exports= Contacts;
 


