const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Set name for contact'],
        minLength:2,
        maxLength:100
      },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
        minLength:3,
        maxLength:100
      },
    phone: {
        type: Number,
        required: [true, 'Set phone for contact'],
        minLength:9,
        maxLength:11
      },
    favorite: {
        type: Boolean,
        default: false,
      },
},{
    versionKey: false,
    timestamps: true,
})

const Contacts = mongoose.model('contacts', contactSchema, 'contacts')

module.exports = Contacts