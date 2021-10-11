const { Schema, model } = require("mongoose");

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set number phone"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
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

contactsSchema.path("name").validate(function (value) {
  const reg = /^[a-zA-Z0-9_ ]*$/;
  return reg.test(String(value));
});

const Contact = model("contact", contactsSchema);

module.exports = Contact;
