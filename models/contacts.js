const mongoose = require("mongoose");

// Schema
const schema = mongoose.Schema(
  {
    name: {
      type: String, // mongoose.Types.String,
      required: [true, "Set name for contact"],
      // enum: ["Viktor", "Volodymyr"],
      unique: true,
      minLength: [3, "It is too short"],
      maxLength: [30, "It is too long"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      minLength: [11, "It is too short"],
      maxLength: [16, "It is too long"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // year: {
    //   type: Number,
    //   min: [4, "It is too short!"],
    //   // match: /\d{4}/,
    //   required: true,
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = mongoose.model("contact", schema);

module.exports = {
  Contact,
};
