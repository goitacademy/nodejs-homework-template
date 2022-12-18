const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

const handleError = (error, data, next) => {
  const { name, code = 400 } = error;
  error.status = code;
  error.message = name;
  next();
};

contactSchema.post("save", handleError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
