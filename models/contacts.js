const {Schema, model} = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const relationships = ["famile", "work", "friend", "service"];
const dateRegExp = /(0?[1-9]|[12][0-9]|3[01])[- _](January|February|March|Aprel|May|June|July|August|September|October|November|December)[- _]((19|20)\d\d)/;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    }, 
    dateOfBirth: {
        type: String,
        match: dateRegExp,
    },
    relationship: {
        type: String,
        enum: relationships,
    }
}, {
    versionKey: false,
    timestamps: true,
});

contactSchema.post("save", handleMongooseError);

const contactsBasicSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
    dateOfBirth: Joi.string().pattern(dateRegExp),
    relationship: Joi.string().valid(...relationships),

} , {
    versionKey: false,
    timestamps: true,
});

const favoriteschema = Joi.object({
    favorite: Joi.boolean(),
})

const schemas = {
    contactsBasicSchema,
    favoriteschema
};

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas
};