const {Schema, model, Types} = require('mongoose')

const contactSchema = Schema(
      {
    name: {
      type: String,
          required: [true, 'Set name for contact'],          
          trim: true,
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
      required: true
    }
    },
    {
      versionKey: false,
      timestamps: true,
    }
    )

const Contact = model('Contact', contactSchema)

module.exports = Contact;