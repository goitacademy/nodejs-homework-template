import mongoose, { model, Schema } from "mongoose";


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
    },
       owner: {
       type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
});

const Contact = model('contacts', contactsSchema);

export default Contact;