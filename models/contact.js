
const {Schema, model} = require("mongoose");
const { handelMongooseError } = require("../helpers");

const contactSchema = new Schema(
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
    },
    { versionKey: false, timestamps: true}
 
  );
  contactSchema.post("save", handelMongooseError);
  const Contact = model('Contact', contactSchema)

  module.exports = Contact