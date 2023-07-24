const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");

const Joi = require("joi")

// const addShema = require("../shemas/shemasContacts")
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
}, {versionsKey: false, timestamps: true});

const addSchema = Joi.object({
    name: Joi.string()
     .min(4)
     .max(30)
     .required()
     .messages({ "any.required": "missing required fields" }),
     email: Joi.string()
     .email()
     .required()
     .messages({"any.required" : "missing required fields"}),
     phone: Joi.string() .pattern(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        { name: "numbers" }
      )
      .required()
      .messages({ "any.required": "missing required fields" }),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

contactSchema.post("save", handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas,
};