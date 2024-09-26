const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const nameRegExp = "^[A-Za-zА-Яа-я]+( [A-Za-zА-Яа-я]+)?$";
const phoneRegExp = "^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: RegExp(nameRegExp),
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: RegExp(phoneRegExp),
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:"user",
      required:true,
    }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);



module.exports = { Contact};
