const {Schema, model} = require("mongoose");
const { handleMongooseError } = require('../helpers');
const Joi = require('joi')

const phonePattern = 

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      // match: 
      required: true
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, { versionKey: false, timestamps: true }
  // когда создан и обновлён контакт, также убирает версию файла
);

contactSchema.post("save", handleMongooseError);

const addJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),

})

const Contact = model("contact", contactSchema);

module.exports = Contact;
