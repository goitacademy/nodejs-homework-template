const { model, Schema } = require("mongoose");
const emailExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const phoneExp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: nameExp,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailExp,
    },
    phone: {
      type: String,
      match: phoneExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const handleErrors = (error, data, next) => {
  const { name, code } = error;
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }
  next();
};
contactSchema.post("save", handleErrors);
const Contact = model("contact", contactSchema);

module.exports = Contact;
