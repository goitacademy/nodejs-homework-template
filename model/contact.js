const { Schema, model } = require('mongoose')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },},
    toObject: { virtuals: true },
  },
)

contactSchema.path('name').validate(function (value) {
  const re = /^([A-Za-z]{1,}[\s][A-Za-z]{1,})/
  return re.test(String(value))
})

const Contact = model('contact', contactSchema)

module.exports = Contact