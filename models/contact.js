const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {mongooseError} = require("../helpers")

const contactSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      phone: {
        type: String,
        unique: true,
        required: true,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
}, { 
  versionKey: false,
  //  timestamps: true
  })

contactSchema.post("save", mongooseError )

contactSchema.index({ name: 1 }, { unique: true });
contactSchema.index({ email: 1 }, { unique: true });
contactSchema.index({ phone: 1 }, { unique: true });

const Contact = model("contact", contactSchema);

module.exports = {Contact};