// contact.js
const { model, Schema } = require('mongoose')

const { handleMongooseError } = require('../helpers/index')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact']
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    favorite: {
      type: Boolean,
      default: false
    },
    // cохраняем тут ИД, генерируемые MongoDB, ref название коллекции user
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  // для добавления времени Event
  { versionKey: false, timestamps: true }
)

contactSchema.post('save', handleMongooseError)

const Contact = model('Contact', contactSchema)
module.exports = { Contact }
