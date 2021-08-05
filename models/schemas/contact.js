const { Schema, SchemaTypes } = require('mongoose');

const contactShema = Schema(
  {
    name: {
      type: String,
      minlength: [3, 'should consist of more than two characters'],
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = contactShema;
