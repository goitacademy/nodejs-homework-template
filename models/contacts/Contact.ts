import { model, Schema } from 'mongoose';

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
        default: false,
    },
}, {
    versionKey: false,
    timestamps: true,
})

const Model = model('contact', contactSchema);

export default Model;


