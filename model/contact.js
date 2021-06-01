const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
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
        delete ret._id
        return ret
      },
  },
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id
      return ret
    },
  },
},
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
