const mongoose = require("mongoose");

// Schema
const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: "user",
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
