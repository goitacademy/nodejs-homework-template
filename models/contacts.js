const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../utils");

const phoneRegexp = /^[0-9+() -]+$/;

const contactsSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        match: phoneRegexp,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { versionKey: false });

contactsSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().label('name'),
    email: Joi.string().email().label('email'),
    phone: Joi.string().pattern(phoneRegexp).label('phone'),
    favorite: Joi.boolean(),
})
.or('name', 'email', 'phone').required()
.custom((value, helpers) => {
const missingFields = [];
if (!value.name) {
    missingFields.push('name');
}
if (!value.email) {
    missingFields.push('email');
}
if (!value.phone) {
    missingFields.push('phone');
}
if (missingFields.length > 0) {
    const missingFieldsStr = missingFields.join(', ');
    return helpers.message(`${missingFieldsStr} field is required`);
}
return value;
})
.options({
messages: {
    "string.empty": '{#label} cannot be empty',
    "string.base": '{#label} must be string',
},
});


const putSchema = Joi.object({
    email: Joi.string().email().allow(''),
    phone: Joi.string().pattern(/^[0-9+() -]+$/).allow(''),
    name: Joi.string().allow(''),
}).or('email', 'phone', 'name').required().messages({
    'object.missing': 'missing fields',
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": `missing field favorite`
    }),
})

const schemas = {
    addSchema,
    putSchema,
    updateFavoriteSchema,
    }

const Contact = model("contact", contactsSchema);

module.exports = {
    Contact,
    schemas,
}
