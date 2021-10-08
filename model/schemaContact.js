const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for this contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for this contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for this contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

contactSchema.virtual('status').get(function () {
  if (this.favorite) {
    return 'best friend';
  }

  return 'not best friend';
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
