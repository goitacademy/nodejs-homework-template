const { Schema, model } = require('mongoose');
const validator = require('mongoose-validator');

const contactsSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      validate: [
        validator({
          validator: 'isEmail',
          message: 'Oops..please enter valid email',
        }),
      ],
    },
    phone: {
      type: String,
      required: true,
      match: [
        /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        'Please fill the number in formats (123) 456-7890 or 123-456-7890',
      ],
    },
    favorite: {
      type: Boolean,
      default: false,

		},
		owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
	{ versionKey: false, timestamps: false },
	

);

const Contact = model('contact', contactsSchema);

module.exports = Contact;