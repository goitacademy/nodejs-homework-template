const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
// const mongooseTypePhone = require("mongoose-type-phone");, SchemaTypes

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 70,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validator: isEmail,
    },
    phone: {
      type: String,
      required: "Phone number is required",
      // type: SchemaTypes.Phone,
      // trim: true,
      // allowedNumberTypes: [
      //   mongooseTypePhone.PhoneNumberType.MOBILE,
      //   mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE,
      // ],
      // phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
      // allowBlank: false,
      // required: true,
      // parseOnGet: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contacts = model("contact", contact);

module.exports = Contacts;
