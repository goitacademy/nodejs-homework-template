const { Schema, model, SchemaTypes } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2"); // подключение пагинатора

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    }, // привязка, чтобы каждый contact был связан с определенным пользователем
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

contactSchema.virtual("info").get(function () {
  return `The Contact ${this.name} have the ${this.phone} number`;
});

contactSchema.plugin(mongoosePaginate); // подключение и применение плагина для пагинатора

const Contact = model("contact", contactSchema);

module.exports = Contact;
