const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema, SchemaTypes } = require('mongoose')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: [
        /^\w+([\-]?\w+)*@\w+([\-]?\w+)*(\.\w{2,3})+$/ /* eslint-disable-line */,
        'Please fill a valid email address',
      ],
    },
    phone: {
      type: String,
      match: [
        /[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/ /* eslint-disable-line */,
        'Please fill a valid phone number',
      ],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

contactSchema.plugin(mongoosePaginate)

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact