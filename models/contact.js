const { Schema, model } = require("mongoose")
const { handleMongooseError } = require('../helpers');

// const Joi = require("joi");

const contactsSchema = new Schema({
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
    }
},
    // { versionKey: false, timestamps: true }
);

contactsSchema.post("save", handleMongooseError);

const Contact = model("contact", contactsSchema);

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// }); 

// const schemas = {
//   updateFavoriteSchema,
// };


module.exports = Contact ;