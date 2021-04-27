const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema, SchemaTypes, model } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "set name for contact"] },
    email: {
      type: String,
      required: [true, "set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "set  phone for contact"],
      unique: true,
    },

    // как пример буля
    favorite: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: "userSchema",
    },
    // token: {type: String, required: [true, 'set token for contact']},
  },
  { versionKey: false, timestamps: true }
);

contactSchema.plugin(mongoosePaginate);
const Contact = model("contact", contactSchema);

module.exports = Contact;
