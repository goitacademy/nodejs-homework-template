const {model,Schema,SchemaTypes} = require('mongoose');

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      trim:true
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
    
  },
  {versionKey:false,timestamps:true})

module.exports = model('contact',contactSchema);