const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    isFavorite: {
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

contactSchema.virtual("status").get(function () {
  if (this.isFavorite === true) {
    return "This contact is Favorite";
  }

  return "This contact is not Favorite";
});

contactSchema.path("name").validate(function (value) {
  const pattern = /[A-Z]\w+/;
  return pattern.test(String(value));
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
