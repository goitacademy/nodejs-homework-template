// created by Irina Shushkevych
const {Schema, model} = require('mongoose')

const contactSchema =  Schema({
   name: {
     type: String,
     required: [true,'Name is required. Set name for contact'],
     minlength: 2
   },
   email: {
     type: String
   },
   phone: {
     type: String,
     minlength: 7
   },
   favorite: {
     type: Boolean,
     default: false
   },
   owner:{
     type: Schema.Types.ObjectId,
     ref: 'user'
   }
},{versionKey: false, timestamps: true})

const Contact = model('contact', contactSchema)

module.exports = Contact
