const {Schema, model} = require('mongoose');
const favoriteList = ["true", "false"]

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
        enum: favoriteList,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
}, {versionKey: false,})

contactSchema.post("save", (error, data, next) => {
    error.status = 400;
    next();
})
const Contact = model("contact", contactSchema);

module.exports = Contact;