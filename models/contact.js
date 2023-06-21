const Joi = require("joi");
const {Schema, model} = require("mongoose");
const {MongooseErrorCode} = require("../helpers");

const contactSchema = new Schema({
     name: {
        type: String,
        required: [true, 'Set name for contact'],
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
        ref: "user",
      },
}, {
    versionKey: false,
    timestamps: true,
})

contactSchema.post("save", MongooseErrorCode);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
}
const Contact = model("contact", contactSchema);

module.exports ={
    Contact,
    schemas,
} 