const { Schema, model, SchemaTypes } = require('mongoose');
const yup = require('yup');

const contactSchema = Schema(
  {
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'authUser',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Contact = model('contact', contactSchema);

// YUP validation
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  phone: yup.string().trim().matches(phoneRegExp, 'Phone number is not valid'),
  id: yup.string(),
  favorite: yup.bool().default(false),
});

const statusSchema = yup.object().shape({
  favorite: yup.bool().required(),
});

module.exports = {
  Contact,
  schema,
  statusSchema,
};
