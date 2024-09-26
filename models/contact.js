const {Schema, model} = require("mongoose");
const {  addSchema, updateFavoriteSchema} = require("../schemas/contacts")
const {handleMongooseError} = require("../helpers");

const contactSchema = new Schema ({
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        }
}, {versionKey: false});

contactSchema.post("save", handleMongooseError);

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};