const { Schema, model } = require("mongoose");
const {mongooseError} = require("../utils/index")


const contactScheme = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
});


contactScheme.post("save", mongooseError);


const Contact = model("contact", contactScheme);


module.exports = Contact;
