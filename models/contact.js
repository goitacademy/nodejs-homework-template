const { Schema, model } = require("mongoose");
const requiredList = require("../constants/index")
const  { handleSaveError, handleUpdateValidate } = require("./hooks");

const contactSchema = new Schema({
    name: {
        type: String,
        required: requiredList,
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
        type: Schema.Types.ObjectId,
        ref: 'user',
        // required: true,
      }
}, {versionKey: false, timestamps: true}
);

contactSchema.pre("findOneAndUpdate", handleUpdateValidate);

contactSchema.post("save", handleSaveError);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

module.exports = Contact;