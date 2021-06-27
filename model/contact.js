const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
    owner: { type: SchemaTypes.ObjectId, ref: "user" },
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
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

contactSchema.plugin(mongoosePaginate);

const Contact = model("contact", contactSchema);

module.exports = Contact;
