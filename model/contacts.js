import mongooseService from 'mongoose';

const { Schema, model } = mongooseService;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [
      true, 'Set name for contact'
    ],
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
},
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true
    },
  },
);

const Contact = model('contact', contactSchema);

export default Contact;