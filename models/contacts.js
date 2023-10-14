const { Schema, model } = require("mongoose")
const {handleMongooseError} = require("../helpers")
const contactSchema = new Schema(  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (value) {
        return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
      },
      message: 'Invalid phone number format, should be (XXX) XXX-XXXX',
    },
  },
    favorite: {
      type: Boolean,
      default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required:true,
    }
  });



contactSchema.post("save", handleMongooseError)

const Contact = model("contact", contactSchema)

module.exports = Contact;