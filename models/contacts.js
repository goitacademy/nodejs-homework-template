const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
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
  },
  { versionKey: false, timestamps: true }
);
contactSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});
contactSchema.post("save", (err, data, next) => {
  err.status = 400;
  next();
});
const Contact = model("contact", contactSchema);

module.exports = Contact;
