const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
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
        owner: {
          type: String,
          ref: 'user',
        }
      },
      { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('contact', contact);

module.exports = {Contact};