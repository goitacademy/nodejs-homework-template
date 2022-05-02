const errors = require('http-errors');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactsSchema = new Schema({
  name: {
    type: String,
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
  favorite: {
    type: Boolean,
    default: false,
  },
});

const schemaErrorHandlingMiddlware = (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(
      new errors[409](
        `User with email "${error.keyValue.email}" already exist`,
      ),
    );
  } else {
    next();
  }
};

contactsSchema.post(['save', 'findOneAndUpdate'], schemaErrorHandlingMiddlware);

exports.model = mongoose.model('Contact', contactsSchema, 'contacts');
