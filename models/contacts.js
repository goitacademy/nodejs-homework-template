const {Schema,model} =require('mongoose');

const ContactSchema = new Schema({
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
},{ versionKey: false })

module.exports = model("Contacts",ContactSchema);