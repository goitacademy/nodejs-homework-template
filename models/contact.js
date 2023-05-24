const {Schema, model} = require("mongoose");
const {  addSchema, updateFavoriteSchema} = require("../schemas/contacts")

const contactSchema = new Schema ({
        name: {
          type: String,
          required: [true, 'Set name for contact'],
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
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};