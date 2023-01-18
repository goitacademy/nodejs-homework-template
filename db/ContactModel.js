const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers/handleMongooseError");

const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const contactShema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // isbn: {
    //   type: String,
    //   require: true,
    //   match: /^\d{3}-\d{3}-\d-\{5}-\d$/,
    // },
    //   crearesAt: { type: Date, defualt: Date.now() },
  },
  { versionKey: false, timestamps: true }
);

// contactShema.post("save", (error, data, next) => {
//   console.log(error.name);
//   console.log(error.code);
//   const { name, code } = error;
//   error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
//   next();
// });
contactShema.post("save", handleMongooseError);
const Contact = mongoose.model("Contact", contactShema);

module.exports = { Contact };
