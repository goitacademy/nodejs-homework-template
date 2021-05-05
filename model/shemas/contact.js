
const  { number, version, boolean } = require( 'joi');
const mongoose = require('mongoose');
// const { delete } = require('../../routes/api/contacts');
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
  

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
    default: "false",
  },
  features: {
    type: Array,
    set: (data) => !data ? [] : data,
    get: (data) => data.sort(),
  },
   owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
      }
},{
  versionKey: false,
  timestamps: true,
  toObject: {
    virtuals: true, transform: function (doc, ret) {
      delete ret._id
      return ret
    }
  },
  
  toJSON: {
    virtuals: true, transform: function (doc, ret) {
      delete ret._id
      return ret
    }
  }
  
});


contactSchema.path('name',).validate((value) => {
  const re = /[A-Za-z]/
  return re.test(String(value))
})

contactSchema.path('phone').validate((value) =>{
  const re = /[0-9,.,-,:]/
  return re.test(String(value))
})

contactSchema.path('email').validate((value) => {
  const re = /[a-z0-9]/
  return re.test(String(value))
})

contactSchema.plugin(mongoosePaginate);

// contactSchema.path('favorite').validate((value) => {
//   const re = / [true, false]/
// return re.test(Boolean(value))
// })

// contactSchema.virtual('strAge', get(function () {
//   return `${this.age}, age`
// }))

  
const Contact = model('shema', contactSchema);

module.exports = Contact