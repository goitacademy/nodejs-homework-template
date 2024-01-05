const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minlength: 2,
    maxlength: 15,
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address! Please use a valid email address with a valid domain.`,
    },
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
    minlength: 14,
    maxlength: 14,
    validate: {
      validator: function (v) {
        return /^\(\d{3}\) \d{3}-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! Please use the format (123) 456-7890.`,
    },
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}
);

const Contact = model("Contact", contactSchema);


module.exports = {
  Contact,
  contactSchema,
};