const { Schema } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
    },
    phone: {
      type: String,
      unique: true,
      minlength: 2,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { verisonKey: false, timestamps: true }
);

module.exports = contactSchema;
