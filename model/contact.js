const { Schema, model, SchemaTypes } = require("mongoose");
const { ValidLengthContactName } = require("../config/constants");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: ValidLengthContactName.MIN_LENGTH_NAME,
      maxLength: ValidLengthContactName.MAX_LENGTH_NAME,
      required: [true, "Set name for contact"],
    },
    surname: {
      type: String,
      minLength: ValidLengthContactName.MIN_LENGTH_NAME,
      maxLength: ValidLengthContactName.MAX_LENGTH_NAME,
      required: [true, "Set surname for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      unique: true,
    },
    favorite: { type: Boolean, default: false },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

contactSchema.virtual("fullname").get(function () {
  return `${this.name} ${this.surname}`;
});

contactSchema.plugin(mongoosePaginate);

const Contact = model("Contact", contactSchema);

module.exports = {
  Contact,
};
