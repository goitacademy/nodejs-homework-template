const { Schema, model } = require("mongoose");
const Joi = require('joi');


const contactSchema = Schema({
  name: { 
    type: String, 
    required: [true, "Set name for contact"] 
  },
  
email: {
    type: String, 
    required: [false, "Set email for contact"],
    // match: /^(\d{3}) \d{3}-\d{2}-\d{2}$/,
  },

  phone: { 
    type: String, 
    required: [true, "Set phone for contact"]
  },

  favorite: {
    type: [Boolean, "Favorite must be true or false"],
    default: false,
  },

 // const genreList = ["fantastic", "love"];
  // const isbnRegexp = /^\d{3}-\d-\d{3}-\d{5}-\d$/;

  // enum  - choose from list
  // genre:{ type: String, enum: genreList, `genre must be on of:"fantastic", "love"` required: true}
  // match - specific format of number example: ISBN-13: 978-2-266-11156-0,
  // unique - дополнит задать настройки в indexes: create->name->field->sort any->options=create unique index
  // isbn:{ type: String, match: /^\d{3}-\d-\d{3}-\d{5}-\d$/, unique: true,  required: true}
},
// прописываем дату создания и дату обновления вместо версии __v:0
{ versionKey: false, timeStamps: true }
);



// const phonePattern =
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
//  or /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

const addSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z]+\s?[a-zA-Z]+$/).min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2}),
  phone: Joi.string().pattern(/^[0-9]+$/).min(9).max(11).required()
  // pattern(phonePattern)
  ,
  favorite: Joi.boolean()
  // genre: Joi.string().valueOf(...genreList).required() ,
  // isbn: Joi.string().pattern(isbnRegexp).required(),
});

const schemas = {
  addSchema,
}
const Contact = model("contact", contactSchema);

module.exports = {Contact, schemas};
