const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
//   phone: {
//     type: String,
//     required: true,
//   },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true,});

const Book = model("contact", contactSchema);

contactSchema.post("save", (error, data, next) => {
    console.log(error);
    next();
})

module.export = Book;
