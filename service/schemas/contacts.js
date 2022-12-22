const { Schema, model, SchemaTypes } = require("mongoose");
const { isEmail } = require("validator");
const mongooseTypePhone = require("mongoose-type-phone");

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 70,
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
      type: SchemaTypes.Phone,
      trim: true,
      allowedNumberTypes: [
        mongooseTypePhone.PhoneNumberType.MOBILE,
        mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE,
      ],
      phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
      allowBlank: false,
      required: true,
      parseOnGet: false,
    },
    favorite: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contacts = model("contact", contact);

module.exports = Contacts;
