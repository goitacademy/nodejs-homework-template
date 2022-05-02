const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { LIMIT_AGE } = require("../libs/constants");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    age: {
      type: Number,
      min: LIMIT_AGE.min,
      max: LIMIT_AGE.max,
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
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.isVaccinated;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
