const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String, required: [true, 'Set name for contact'] },
    avatarURL: {
      type: String,
      default: '',
    },

    email: {
      type: String,
    },

    phone: { type: String, match: /\d{7}/ },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },

  { versionKey: false, timestamps: true },
  {}
);

// Model (Class)

const Contact = model('contact', schema);

module.exports = {
  Contact,
};
