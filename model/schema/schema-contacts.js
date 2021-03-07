const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Subscription } = require("../../helpers/constants");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter name"],
    },
    email: {
      type: String,
      required: [true, "Enter email"],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, "Enter phone"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      default: "free",
    },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.plugin(mongoosePaginate);
const Contacts = model("contact", contactSchema);

module.exports = Contacts;
