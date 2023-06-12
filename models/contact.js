const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const {
  schemaAddContact,
  schemaUpdateContact,
  updateFavoriteSchema,
} = require("../schemas/schemaContact");

const regexpPhone = /^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;
const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: regexpEmail,
      required: true,
    },
    phone: {
      type: String,
      match: regexpPhone,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const schemas = {
  schemaAddContact,
  schemaUpdateContact,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  schemas,
  Contact,
};
