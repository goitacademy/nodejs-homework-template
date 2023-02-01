const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
        //  [true, "Set name for contact"],
      },
      email: {
        type: String,
        unique: true,
      },
      phone: {
        type: String,
        unique: true,
        // match: isPhoneRegex,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
    Contact 
}