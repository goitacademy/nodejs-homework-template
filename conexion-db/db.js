const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const SchemaCont = new Schema({

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

}, { collection: 'contacts' });

const Contact = mongoose.model("Contact", SchemaCont);

module.exports = Contact