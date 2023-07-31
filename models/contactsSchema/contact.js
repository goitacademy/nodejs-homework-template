const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../../helpers");

// Mongoose schema
const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
    // owner is a person who added the contact
    owner: {
      // user ID - is a special type of data from mongoose
      type: Schema.Types.ObjectId,
      // name of collection which is this ID from
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
