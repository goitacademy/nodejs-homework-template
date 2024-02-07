const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Set name for contact'],
            unique: [true, 'Duplicated name..'],
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
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact 