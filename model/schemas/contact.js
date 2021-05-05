const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema({
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
  features: {
    type: Array,
    set: (data) => (!data ? [] : data),
    get: (data) => data.sort,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id
      return ret
    },
  },
},
)

contactSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/
  return re.test(String(value))
})

// Виртуальное поле
// contactSchema.virtual('strAge').get(function () {
//   return `${this.phone}`
// })

contactSchema.plugin(mongoosePaginate)

const Contact = model('contact', contactSchema)

module.exports = Contact
