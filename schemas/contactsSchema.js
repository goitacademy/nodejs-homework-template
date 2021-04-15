const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose

const contactsSchema = new Schema({    
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
          required: [true, 'Set email for contact'],
        },
        phone: {
          type: String,
          required: [true, 'Set phone for contact'],
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: SchemaTypes.ObjectId,
          ref: 'user',
        }
      },
      {versionKey: false, timestamps: true}  
);


const contacts = mongoose.model('contact', contactsSchema)

module.exports = contacts