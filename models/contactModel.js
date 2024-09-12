const { number } = require("joi");
const mongoose = require("mongoose");



const Schema = mongoose.Schema;

const contactSchema = new Schema({
  id: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: (value) => {
        value.includes("@");
      },
  },
  phone: {
    type: Number,
    required: true,
   
  }, 

});

const Contact = mongoose.model("contact", contactSchema);

module.exports = {
  Contact
};
