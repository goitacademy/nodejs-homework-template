const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email']
    },
    phone: {
        type: String,
        required: [true, 'Set phone']
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    // features: {
    //     type: Array,
    //     set: (data) => (!data ? [] : data),
    //     get: (data) => data.sort()
    // },
    // owner: {
    //     name: String,
    //     age: Number,
    // },
},
    { versionKey: false, timestamps: true },
)

contactSchema.path('name').validate((value) => {
    const re = /[A-Z]\w+/
    return re.test(String(value))
})

contactSchema.virtual('nick').get(function () {
    return `${this.name} nickname`
})

const Contact = model('contact', contactSchema)
  
module.exports = Contact
