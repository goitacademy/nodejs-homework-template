const {Schema, model} = require("mongoose");


const contacSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    favorite: Boolean
});

const Contact = model("contact", contacSchema);


module.exports = Contact;