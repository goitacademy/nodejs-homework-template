const { Schema, model } = require("mongoose");

const ContactsShema = new Schema(
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

ContactsShema.post("save", (error, data, next) => {
  console.log(error);
  next();
});

const Contacts = model("contact", ContactsShema);

module.exports = Contacts;
