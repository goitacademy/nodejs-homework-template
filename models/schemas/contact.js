const { Schema, SchemaTypes, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, 'should consist of more than two characters'],
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      validate: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,7}$/, 'Provided email is invalid. Provide email in aaa@bbb.ccc format'],
    },
    phone: {
      type: String,
      validate: [/^\+\d{12}$/, 'Provided phone is invalid. Provide phone in +XXXXXXXXXXXX format'],
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
);

contactSchema.plugin(mongoosePaginate);

module.exports = contactSchema;
