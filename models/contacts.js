const { handleMongooseError } = require("../helpers/index");

const {Schema, model} = require('mongoose');

const contactsSchema = new Schema ({
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
    ref: 'user',
    required: true
  },
},{
  versionKey: false,
  // timestamps: true
});

const Contacts = model('contacts', contactsSchema);

contactsSchema.post('save', handleMongooseError)

module.exports = Contacts;