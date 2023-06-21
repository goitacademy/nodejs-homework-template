const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contactSchema = Schema(
      {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        unique: [true, 'Duplicated email..'],
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
      owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
    },
    {
      versionKey: false,
      timestamps: true,
    }
    )

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact;