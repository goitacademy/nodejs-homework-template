const {Schema, model} = require("mongoose");
const handleMongooseError = require('../helpers/handleMongooseError');
const {emailRegexp, phoneRedexp} = require('../helpers/regExp');

const contactSchema = new Schema (  {
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
          validate: {
            validator: function(email) {              
              return emailRegexp.test(email)
          }, message: 'Please fill a valid email address'},
  },
  phone: {
    type: String,
    required: [true, 'Set phone number for contact'],
    validate: {
      validator: function(v) {
        return phoneRedexp.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required:true
  }
},
{ versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;