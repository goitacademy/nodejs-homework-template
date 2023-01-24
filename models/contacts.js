const {Schema, model} = require("mongoose");

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
              const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
              return re.test(email)
          }, message: 'Please fill a valid email address'},
  },
  phone: {
    type: String,
    required: [true, 'Set phone number for contact'],
    validate: {
      validator: function(v) {
        return /^(\(\d{3}\))\s?(\d{3}-\d{4})$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
{ versionKey: false, timestamps: true }
);

contactSchema.post("save", (error, data, next)=> {
  const {name, code} = error;
  error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
  next()
});

const Contact = model("contact", contactSchema);

module.exports = Contact;