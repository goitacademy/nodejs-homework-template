const { Schema, model} = require('mongoose');
const {handlerError} = require('../utils')

const contactsSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
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
}, {
    versionKey: false,
    timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
});

contactsSchema.post("save", handlerError);

const Contact = model('contact', contactsSchema);

module.exports = Contact;