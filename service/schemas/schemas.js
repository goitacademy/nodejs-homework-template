const mongoose = require("mongoose");
const handleMongooseError = require("../../helpers/handleMongooseError");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    favorite: {
        type: Boolean,
        default: false
    }
});

contactSchema.pre("save", function (next) {
  if (!this.name) {
    next(new Error("Name is required"));
  } else {
    next();
  }
});

contactSchema.post("save", handleMongooseError);

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
