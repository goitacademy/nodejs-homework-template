const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { handleMongooseError } = require("../../utils");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 70,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// contact.path("email").validate((value) => {
//   const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(String(value));
// });

// contact.path("phone").validate((value) => {
//   const re = /^(\d*|\+*|-*| *|\(*|\)*)*$/;
//   return re.test(String(value));
// });
contactSchema.post("save", handleMongooseError);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
