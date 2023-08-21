const { Schema, model } = require("mongoose");
const {handleMongooseError} = require('../helpers');

const contactSchema = Schema(
    {
      name: {
        type: String,
        required: [true, "Set name for contact"],
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
    },
    {
        versionKey: false,
        timeStamps: true 
    }
  );

  //contactSchema.post('save', handleMongooseError)

  const Contact = model("contact", contactSchema);

  module.exports = Contact;