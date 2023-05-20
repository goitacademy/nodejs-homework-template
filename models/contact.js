const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../middlewares');


// const sex = ['female', 'male'];

const phoneRegexp =
  /^\(\d{3}\)[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

// MONGOOSE schema
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    //   sex: {enum: sex},
  },
  { versionKey: false, timestamps: true }
);

// middleware for error validation (400)
contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = Contact;
