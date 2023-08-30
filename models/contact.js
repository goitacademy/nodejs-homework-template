const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Set name for contact"],
      },
      email: {
        type: String,
        match: emailRegexp,
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
    { versionKey: false, timestamps: true }
  );

  contactSchema.post("save", handleMongooseError);

  const Contact = model("contact", contactSchema);
  
  module.exports = Contact;