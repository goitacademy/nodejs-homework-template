const { Schema, model, SchemaTypes } = require('mongoose');
const { ValidContactName } = require('../config/constants');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: ValidContactName.MIN_LENGTH,
      max: ValidContactName.MIN_LENGTH,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: { type: Boolean, default: false },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },

  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

const Contact = model('Contact', contactSchema);

module.exports = Contact;
