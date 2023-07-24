const { Schema, model } = require("mongoose");

const  { handleSaveError, handleUpdateValidate } = require("./hooks");

// const { requiredList } = require('../constants/contact-constants');

// import { genreList, releaseDateRegexp } from "../constants/movie-constants.js";

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
}, {versionKey: false, timestamps: true}
);

contactSchema.pre("findOneAndUpdate", handleUpdateValidate);

contactSchema.post("save", handleSaveError);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

module.exports = Contact;