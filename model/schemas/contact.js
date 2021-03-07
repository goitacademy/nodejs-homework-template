const { Schema, SchemaTypes, model } = require('mongoose')
const { Subscription, Owner } = require('../../helpers/constants')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 60,
      required: [true, 'Set contact Name'],
      default: 'Default Partner',
    },
    email: {
      type: String,
      required: [true, 'Set contact Email'],
      default: 'example@email.com',
    },
    phone: {
      type: String,
      required: [true, 'Set contact Phone number'],
      default: '000-000-0000',
    },
    subscription: {
      type: String,
      require: [true, 'Set contact subscription type'],
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      default: Subscription.FREE,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: Owner.USER,
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)

module.exports = Contact
