const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');


const contactSchema = new Schema(
    {
        name: {
            type: SchemaTypes.String,
            required: [true, 'Set name for contact'],
            unique: true,
        },
        email: {
            type: SchemaTypes.String,
            required: [true, 'Set email for contact'],
            unique: true,
        },
        phone: {
            type: SchemaTypes.String,
        },
        favorite: {
            type: SchemaTypes.Boolean,
            default: false,
        },
        owner: {
            type: SchemaTypes.ObjectId,
            ref: 'user',
        },

    },
    { versionKey: false, timestamps: true }
)
contactSchema.plugin(mongoosePaginate);

const Contact = model('contact', contactSchema)

module.exports = Contact