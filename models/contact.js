const { Schema, model } = require('mongoose')


const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"]
    },
    email: {
        type: String,
        required: true,
        
    },
    phone: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false,
    },
     owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, {versionKey: false, timestamps: true})

contactSchema.post("save", (error, data, next) => {
    const {name, code} = error;
    const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    error.status = status;
    next();
})


const Contact = model("contact", contactSchema)

module.exports = Contact;