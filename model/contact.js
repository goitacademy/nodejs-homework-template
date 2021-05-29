const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: String, // String is shorthand for {type: String}
    email: String,
    phone: String,
    inArray: {
      type: Boolean,
      default: false,
    },
    user: [{ name: String, email: String, phone: String }],
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);
contactSchema.virtual("info").get(function () {
  console.log(`this ${this.name}`);
});
contactSchema.path("name").validate((value) => {
  const re = /[A-Z]\w+/g;
  return re.test(String(value));
});
const Contact = model("contact", contactSchema);
module.exports = Contact;
