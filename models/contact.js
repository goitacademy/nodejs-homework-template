const { Schema, model } = require('mongoose');
const Joi = require('joi');
// const {handleSaveErrors} = require('./helpers/handleSaveErrors')


const contactSchema = new Schema({
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
}, { versionKey: false, timestamps: true }); 

const schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),

})

contactSchema.post("save", (error, data, next) => {
  const { name, code } = error;
  error.status = (name === "MongoServerError" && code === undefined) ? 409 : 400;
  console.log(name);
  console.log(code);
  next();
})

const Contact = model('contact', contactSchema);



module.exports = {
  Contact,
  schema,
  updateFavoriteSchema
};